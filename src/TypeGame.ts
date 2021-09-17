import { stages } from './stages'

type Cast<A, B> = A extends B ? A : B
type Index<T, K, V = never> = K extends keyof T ? T[K] : V
type Length<T> = Cast<Index<T, 'length', 0>, number>


/* ?????  TypeScript 4.4.2
type A = ['🌑', '👾']
type B = A[-1] //-------------> "🌑" | "👾"
type C = -1 extends keyof A ? 1 : 0 //-------------> 1
*/
type Sub1Table = ['?????', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
type Add1Table = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
type Sub1<T> = Index<Sub1Table, T>
type Add1<T> = Index<Add1Table, T>
type Sub2<T> = Sub1<Sub1<T>>
type Add2<T> = Add1<Add1<T>>

type Step<prev2, prev1, current, next1, next2> = Index<{
    '🌑': next1 extends ('👾' | '👽') ? '👾' : next1 extends ('😃' | '😎') ? (next2 extends ('👾' | '👽') ? '😃' : current) : current
    '🕶️': next1 extends ('👾' | '👽') ? '👽' : next1 extends ('😃' | '😎') ? (next2 extends ('👾' | '👽') ? '😎' : current) : current
    '👾': prev1 extends ('🌑' | '🕶️') ? '🌑' : prev1 extends ('😃' | '😎') ? (prev2 extends ('🌑' | '🕶️') ? '🌑' : current) : current
    '👽': prev1 extends ('🌑' | '🕶️') ? '🕶️' : prev1 extends ('😃' | '😎') ? (prev2 extends ('🌑' | '🕶️') ? '🕶️' : current) : current
    '🎇': '🎇'
    '😃': next1 extends ('👾' | '👽') ? (prev1 extends ('🌑' | '🕶️') ? '👾' : current) : current
    '😎': next1 extends ('👾' | '👽') ? (prev1 extends ('🌑' | '🕶️') ? '👽' : current) : current
}, current>

type MatrixRow<T, I> = { [K in keyof T]: Index<T[K], I> }
type MatrixRotateAndScale<T, N = 0> =
    N extends Length<Index<T, 0>> ? []
    : [MatrixRow<T, N>, ...MatrixRotateAndScale<T, Add1<N>>]

type W<T> = MatrixRotateAndScale<A<MatrixRotateAndScale<T>>>
type S<T> = MatrixRotateAndScale<D<MatrixRotateAndScale<T>>>
type _A<T> = { [K in keyof T]: Step<Index<T, Sub2<K>, ''>, Index<T, Sub1<K>, ''>, T[K], Index<T, Add1<K>, ''>, Index<T, Add2<K>, ''>> }
type A<T> = { [K in keyof T]: _A<T[K]> }
type _D<T> = { [K in keyof T]: Step<Index<T, Add2<K>, ''>, Index<T, Add1<K>, ''>, T[K], Index<T, Sub1<K>, ''>, Index<T, Sub2<K>, ''>> }
type D<T> = { [K in keyof T]: _D<T[K]> }

type Combo<T> = {
    w: Combo<W<T>>
    s: Combo<S<T>>
    a: Combo<A<T>>
    d: Combo<D<T>>
    over: Render<T>
}

type YouWin = _Render<['GameClear', 'WoW', 'MuchFun'], null>
type IsYouWin<T> = '😃' extends Index<Index<T, number>, number> ? 0 : 1

type Join<T, N = 0> =
    N extends Length<T> ? ''
    : `${Cast<Index<T, N>, string>}${Join<T, Add1<N>>}`

type _Render<T, next, N = 0> =
    N extends Length<T> ? next
    : { [K in Cast<Index<T, N>, string>]: _Render<T, next, Add1<N>> }

type Render<T> = _Render<
    { [K in keyof T]: Join<T[K]> },
    [Combo<T>, YouWin][IsYouWin<T>]
>

export const TypeGame: { [K in keyof stages]: Render<stages[K]> } = null!