# 05. AI Agent 设计范式与核心交互机制

> [!NOTE]
> AI Agent（智能体）使得大语言模型（LLM）从单纯的“聊天机器”进化成了具备行动能力的“执行者”。本文将从宏观的设计范式入手，深入到微观的 Agent 与外部工具（如 MCP）的交互底层逻辑，带你彻底看清 Agent 的工作本质。

## 一、AI Agent 主流设计范式

当前业界有多种让 LLM 进行推理与行动结合的模式，每种范式都有其特定的适用场景与权衡（Tradeoffs）。

### 1. ReAct 模式 (思考 -> 行动 -> 观察 -> 再思考)

- **核心逻辑**：交替进行思考（Thought）和行动（Action）。这是 Agent 的基石与入门标准，教会了模型“如何使用工具”。
- **优点**：逻辑清晰，过程可干预。
- **缺点**：
  - **延迟高**：每一步都要等 LLM 生成、等工具执行、再等 LLM 继续，多步任务耗时极长。
  - **容易迷失**：在超长的思考链条中，模型可能会忘记最初的目标，或者陷入死循环。
  - **效率低**：对于“查个天气”这种简单任务，ReAct 显得过于繁琐。

### 2. 规划执行模式 (Plan-and-Solve / Code Generation)

- **核心逻辑**：模型不再一步一步地交互，而是**一次性生成完整的执行计划**（通常是一段脚本，如 Python 或 Bash），然后由沙盒或解释器直接运行代码，最后返回结果。
- **代表框架**：LangChain 的 `CodeAgent`、OpenAI 的 `Advanced Data Analysis`。

### 3. 反射/自我修正模式 (Reflexion / Self-Correction)

- **核心逻辑**：在 ReAct 的基础上增加了一个**“反思”**环节。如果行动失败或执行结果不符合预期，模型会先复盘错误原因，更新自己的策略记忆，然后再进行下一次尝试。
- **代表论文**：《Reflexion: Language Agents with Verbal Reinforcement Learning》。

### 4. 多智能体协作模式 (Multi-Agent Collaboration)

- **核心逻辑**：不再依赖一个“超级大脑”做所有事，而是将复杂任务拆解，分发给多个**具有不同预设角色（Role）**的 Agent 协作完成。
- **代表框架**：Microsoft **AutoGen**、Stanford **CAMEL**、**CrewAI**。

### 5. 基于工作流/状态机模式 (Workflow / State Machine)

- **核心逻辑**：完全抛弃让 LLM 自由决定下一步的做法。开发者预先定义好固定的流程图（DAG，有向无环图），LLM 只负责在特定的节点中做文本生成或分类判断（路由）。
- **代表框架**：**LangGraph**、Dify (Workflow 模式)、Coze。

### 6. 端到端微调模式 (End-to-End Fine-tuned Agents)

- **核心逻辑**：不使用繁复的 Prompt Engineering（如提供 ReAct 模板），而是直接用高质量的“思考 - 行动”轨迹数据对模型进行**微调 (SFT)** 或**强化学习 (RL)**。
- **特点**：模型内部隐式地学会了何时调用工具，输出格式更紧凑，甚至不需要显式的 `Thought:` 标签。
- **优势**：推理速度极快，Token 消耗少，响应更像原生函数调用。
- **代表**：各类垂直领域的专属小模型。

---

## 二、Agent 交互底层拆解：以 ReAct 为基石

光懂得范式还不够，我们需要知道代码运行的那一瞬间，系统到底发生了什么。我们通过一个经典的**查天气**场景，来解剖 Agent、LLM 以及 MCP（Model Context Protocol）之间的精密协作。

> **场景示例**：
>
> - **用户指令**：“帮我查一下北京今天的天气，如果下雨就提醒我带伞。”
> - **可用工具（通过 MCP 注册）**：`get_weather(city)`

### 交互步骤详解

我们把一次工具调用分解成 9 个标准动作：


| 步骤    | 角色             | 动作与数据内容                                                                                                               | 关键原理剖析                                                                    |
| ----- | -------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **1** | **Agent**      | **构建 Prompt** 包含： 1. 系统角色设定 2. **MCP 工具列表** (`get_weather`, `city`) 3. 用户原始问题                                         | Agent 必须将 MCP Server 提供的工具定义（Schema）注入到 Prompt 中。这是在告诉 LLM：“你现在拥有这些‘手脚’”。 |
| **2** | **LLM**        | **生成回复 (Response)** `{"thought": "需要先查天气", "tool": "get_weather", "args": {"city": "Beijing"}}`                       | **LLM 怎么回复？** LLM 不会直接执行代码，它输出的仅仅是一个**计划（文本）**，内部包含了打算调用的工具与参数。           |
| **3** | **Agent**      | **解析与路由 (Parsing)** 1. 检测到特定标识（如 `tool`）。 2. 剥离出目标工具名与参数字典。 3. **暂停对话生成**，准备切换执行上下文。                                  | **Agent 的解释器身份** Agent 拦截了 LLM 的输出流，判断出这是“行动指令”而非“最终回答”，进而接管控制权。          |
| **4** | **MCP Client** | **发送协议请求** `POST /call_tool` `{"name": "get_weather", "arguments": {"city": "Beijing"}}`                              | Agent 作为客户端，通过标准化的 MCP 协议，将执行请求发给独立的 MCP Server。                          |
| **5** | **MCP Server** | **执行并返回** `{"content": [{"type": "text", "text": "Rainy"}]}`                                                          | 外部服务（或本地脚本）执行真实业务逻辑，获得原始数据。                                               |
| **6** | **Agent**      | **构造观察值 (Observation)** 将结果封装为特定消息： `"Observation: The weather in Beijing is Rainy."`                                 | Agent 把冰冷的返回数据翻译成能无缝嵌入对话流的“上下文（Context）”。                                 |
| **7** | **Agent**      | **更新历史 (Context Update)** 拼接：旧对话 + LLM此前的调用请求 + 当前观察值，形成新一轮 Prompt。                                                   | **短期记忆注入** 这是维系思维连续性的关键，强制给 LLM 戴上“记忆眼镜”，让它知道外界反馈了什么。                     |
| **8** | **LLM**        | **二次推理 (Second Pass)** 输入：加入了 `Observation: Rainy` 的上下文。 输出：`{"thought": "下雨了，需提醒带伞", "final_answer": "北京今日下雨，请带伞！"}` | **LLM 闭环推理** LLM 看到真实数据后，结合用户的最初条件推导出最终结论。                                |
| **9** | **Agent**      | **输出最终结果** 检测到终止动作标识（如 `final_answer`），结束事件循环，将文本展示给最终用户。                                                             | 任务生命周期结束。                                                                 |


---

## 三、代码级骨架：Agent 引擎的极简抽象

为了更直观地映射上述状态机，下面提供一段包含了核心设计模式的极简 Python 伪代码。

> 本代码旨在体现其骨架设计：将 Agent 视为一个大管家，在 LLM 与外部接口之间充当拦截器与桥梁。

```python
def run_agent_with_mcp(user_query, llm, mcp_client):
    """
    极简 Agent 引擎：管理对话历史，并在 LLM 与 MCP 工具之间充当路由桥梁。
    """
    # 1. 初始化对话历史 (上下文窗口)
    messages = [
        {"role": "system", "content": "你是一个智能助手，使用提供的工具来解答问题。"},
        {"role": "user", "content": user_query}
    ]
    
    # 动态获取并注入 MCP 工具的 Schema 描述
    tools_definition = mcp_client.list_tools() 
    messages[0]["content"] += f"\nAvailable Tools: {tools_definition}"

    max_turns = 5 # 设定安全终止层数，防止模型无限陷入死循环
    
    for _ in range(max_turns):
        # 2. 单次前向生成：调用 LLM
        response = llm.chat(messages)
        
        # 3. 解析与拦截：Agent 取代自然表达介入流程
        if response.has_tool_call():
            tool_name = response.tool_name
            tool_args = response.tool_args
            
            # --- 物理世界的行动边界 ---
            
            # 4. MCP 协议调用执行
            observation = mcp_client.call_tool(tool_name, tool_args)
            
            # 5. 上下文状态闭环
            # 必须将上一步 "打算做什么"，以及这步 "观察到什么" 都注入记忆
            messages.append({
                "role": "assistant", 
                "content": f"I will call {tool_name} with {tool_args}"
            })
            messages.append({
                "role": "tool",
                "name": tool_name,
                "content": f"Observation: {observation}"
            })
            
            # 携带最新记录，触发下一次循环（回到步骤 8：二次推理）
            continue
            
        else:
            # LLM 认为已收集充分，直接输出结果
            return response.content

    return "Error: Max turns reached"
```

---

## 四、核心机制总结与格式化约束

我们可以用严谨的定义来总结系统中这几个核心角色的本质：

1. **LLM 是思考引擎（认知预测器）**：
  LLM 从不直接“执行”代码，其输出本质上是一个结构化的**决策意图映射**。我们在训练或微调中，约定俗成地把某块输出文本规定为“工具调用指令”。
2. **Agent 是状态机与执行解释器**：
  Agent 是实际的控制中枢。它负责**拦截（Intercept）**LLM 的乱序流输出，**提取（Extract）结构化参数，通过协议发起桥接（Bridge）实际调用，最后将结果无损转化为带身份标签的消息进行反馈（Feedback）**。
3. **MCP 是标准化的微件插槽**：
  MCP 协议将各种异构服务抽象收敛。Agent 完全无需知晓 `get_weather` 是基于 Python 的函数实现还是远程的 HTTP API，一切都被抹平为了统一的输入输出契约。

### 格式纪律：工具调用的严苛容错战

Agent 工作流程严重依赖对模型内部生成的预设结构指令的精准解析。一旦格式破坏（幻觉引发），代码层面的异常就会打断状态机轮转。因此，规范模型输出始终是 Agent 调优的核心所在。


| 约束场景                                | 推荐工程方案                                   | 理由与最佳实践                                                                                         |
| ----------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **使用先进商业 API (GPT-4 / Claude 最新版)** | **方案一：Native Structured Output（原生函数调用）** | 官方原生提供的接口特征，模型经过巨量定向微调，鲁棒性最强。**工业 Agent 应作为首选**。                                                |
| **本地部署开源模型 (Llama 3 / Qwen)**       | **方案二：Grammar / Outlines 引擎约束**          | 在 Token 生成引擎层强行注入 JSON Schema，拦截不符合规范规范的字节序列。这种物理层面的强制手段远胜于提示词约束。                               |
| **仅能操作文本流的服务层**                     | **方案三：Prompt 模板 + 尾部容错提取**               | 纯靠提示词要求（如 `<action></action>`），配合代码级的 RegEx 与异常抓取重试（Let it crash and retry）。实现成本低，但多轮轮转下稳定性易崩盘。 |


> [!IMPORTANT]
> 在构建 Agent 框架时，只要不是面对无法接入的高墙，永远优先采用平台提供的原生函数调用机制。对工具调用产生的微小标点错误进行容错轮转是非常低效且资源浪费的工程实践。

---

*作者：[AI-Authored Tech Chronicles]*
*系列：《AI 编程与工程化》第六篇*
*写于 2026-04-22*

