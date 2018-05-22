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

/**
 * 对象值被set修改时的触发函数
 */
function cb (val) {
    console.log('update view lalala...', val)
}

/**
 * 实现对象[响应式]
 * Object.defineProperty(object, propertyname, descriptor) : 作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性，并返回这个对象。
 * 这里要注意的是, 如果打开 writable 属性配置, 无论设置为true or false, 都会抛出异常Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
 * 因为访问器属性(get/set)不能和value/writable属性共存
 */
function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true, // enumerable是一个布尔值，表示该属性是否可遍历，默认为true。如果设为false，会使得某些操作（比如for...in循环、Object.keys()）跳过该属性
        configurable: true, // 控制了属性描述对象的可写性, 默认为true
        get: function reactiveGetter () {
            return val
        },
        set: function reactiveSetter (newVal) {
            cb(newVal)
        }
    })
}

/**
 * 传入一个需要[响应式]的对象, 遍历它的属性, 都让 defineReactive 函数对其重新定义, 有getter/setter属性
 */
function observer (obj) {
    if (!obj || (typeof obj !== 'object')) return

    Object.keys(obj).forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
}

/**
 * 构造函数
 */
class Mue {
    constructor (options) {
        this._data = options.data
        observer(this._data)
    }
}


let test = new Mue({
    data: {
        txt: 'are u OK?'
    }
})

test._data.txt = 'I\'m OK!'
