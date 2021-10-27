export type Cast<A, B> = A extends B ? A : B
export type Index<T, K, V = never> = K extends keyof T ? T[K] : V
export type Length<T> = Cast<Index<T, 'length', 0>, number>

/* ?????  TypeScript 4.4.2
type A = ['🌑', '👾']
type B = A[-1] //-------------> "🌑" | "👾"
type C = -1 extends keyof A ? 1 : 0 //-------------> 1
*/
type Sub1Table = ['!!!!', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
type Add1Table = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
export type Sub1<T> = Index<Sub1Table, T>
export type Add1<T> = Index<Add1Table, T>
export type Sub2<T> = Sub1<Sub1<T>>
export type Add2<T> = Add1<Add1<T>>

export type MatrixRow<T, I> = { [K in keyof T]: Index<T[K], I> }
export type MatrixRotateAndScale<T, N = 0> =
    N extends Length<Index<T, 0>> ? []
    : [MatrixRow<T, N>, ...MatrixRotateAndScale<T, Add1<N>>]

export type Join<T, N = 0> =
    N extends Length<T> ? ''
    : `${Cast<Index<T, N>, string>}${Join<T, Add1<N>>}`

export type Render<T, next, N = 0> =
    N extends Length<T> ? next
    : { [K in Cast<Index<T, N>, string>]: Render<T, next, Add1<N>> }