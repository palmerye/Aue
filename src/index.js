
/**
 * ↓ 创建Vue实例
 * ↓ init初始化: 初始化生命周期、事件、props、methods、data、computed、watch...
 *      通过 Object.defineProperty 设置 setter 与 getter 函数，用来实现「响应式」以及「依赖收集」
 * ↓ mount挂载组件
 * ↓ compile编译: 
 *      parse: 用正则等方式解析 template 模板中的指令、class、style等数据，形成 AST (抽象语法树)
 *      optimize: 标记 static 静态节点, 用于patch优化(diff 算法会跳过 static)
 *      generate: 将 AST 转化成 render function 字符串
 * ↓ 响应式:
 *      Object.defineProperty 使得当被设置的对象被读取的时候会执行 getter 函数，而在当被赋值的时候会执行 setter 函数
 *      当render function 被渲染的时候, 要读取所需对象的值, 所有会触发[依赖收集], 目的是将watcher放到订阅者的subs中
 *      修改对象的值时, 会触发相应的 setter 函数, 去通知[依赖收集]中的watcher, 去重新渲染视图(update and patch)
 * ↓ Virtual DOM
 *      render function 被转化成 VNode 节点(js对象), 用对象来描述节点, 只是一层对真实DOM的抽象, 不依赖真实平台环境, 因此可以实现跨平台(浏览器/weex/node) 
 *      这里更新视图的时候, 其实有个diff算法 优化的过程, 因为实质上只需要更新[差异], 不需要全部更新
 */
