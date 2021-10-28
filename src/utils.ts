//类型里面就不再写类型了
//直接各种暴力操作 强转
export type Cast<A, B> = A extends B ? A : B
export type Index<T, K, V = never> = K extends keyof T ? T[K] : V
export type Length<T> = Cast<Index<T, 'length', 0>, number>

//TypeScript 4.4.2
//type A = ['a', 'b'][-1]  
//返回的 'a' | 'b'
type Sub1Table = ['这里就不用 -1 了', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
type Add1Table = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

//20以内 +1 -1 就够用了 直接查表
export type Sub1<T> = Index<Sub1Table, T>
export type Add1<T> = Index<Add1Table, T>
export type Sub2<T> = Sub1<Sub1<T>>
export type Add2<T> = Add1<Add1<T>>

/*
矩阵 取1列
MatrixCol<[
    [1, 2, 3],
    [4, 5, 6]
], 0>
返回 
[1, 4]
*/
export type MatrixCol<T, I> = { [K in keyof T]: Index<T[K], I> }


/*
矩阵 旋转 + 翻转
MatrixRotateAndScale<[
    [1, 2, 3],
    [4, 5, 6],
]>
返回 
[
    [1, 4],
    [2, 5],
    [3, 6],
]
*/
export type MatrixRotateAndScale<T, N = 0> =
    N extends Length<Index<T, 0>> ? []
    : [MatrixCol<T, N>, ...MatrixRotateAndScale<T, Add1<N>>]


//连接 ['a', 'b', 'c', 'd']  转成  'abcd'
export type Join<T, N = 0> =
    N extends Length<T> ? ''
    : `${Cast<Index<T, N>, string>}${Join<T, Add1<N>>}`

//渲染 ['a', 'b', 'c', 'd'] next  转成  { a: { b: { c: { d: next } } } }
export type Render<T, next, N = 0> =
    N extends Length<T> ? next
    : { [K in Cast<Index<T, N>, string>]: Render<T, next, Add1<N>> }