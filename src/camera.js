///PerspectiveCamera方法根据 fov, aspect, near, far 生成透视投影相机.PerspectiveCamera对象的功能函数采用
///定义构造的函数原型对象来实现.
///<summary>PerspectiveCamera</summary>
///<param name ="fov" type="Number">指明相机的可视角度,可选参数,如果未指定,初始化为50</param>
///<param name ="aspect" type="Number">指明相机可视范围的长宽比,可选参数,如果未指定,初始化为1</param>
///<param name ="near" type="Number">指明相对于深度剪切面的近的距离，必须为正数,可选参数,如果未指定,初始化为0.1</param>
///<param name ="far" type="Number">指明相对于深度剪切面的远的距离，必须为正数,可选参数,如果未指定,初始化为2000</param>
///<returns type="Matrix4">返回PerspectiveCamera,透视投影相机.</returns>

export class MyPerspectiveCamera extends THREE.PerspectiveCamera {}