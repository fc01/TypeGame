import { stages } from './stages'
import { Index, Add1, Sub2, Sub1, Add2, Join, Render, MatrixRotateAndScale } from './utils'

type Step<prev2, prev1, current, next1, next2> = Index<{
    '🌑': next1 extends ('👾' | '👽') ? '👾' : next1 extends ('😃' | '😎') ? (next2 extends ('👾' | '👽') ? '😃' : current) : current
    '🕶️': next1 extends ('👾' | '👽') ? '👽' : next1 extends ('😃' | '😎') ? (next2 extends ('👾' | '👽') ? '😎' : current) : current
    '👾': prev1 extends ('🌑' | '🕶️') ? '🌑' : prev1 extends ('😃' | '😎') ? (prev2 extends ('🌑' | '🕶️') ? '🌑' : current) : current
    '👽': prev1 extends ('🌑' | '🕶️') ? '🕶️' : prev1 extends ('😃' | '😎') ? (prev2 extends ('🌑' | '🕶️') ? '🕶️' : current) : current
    '🎇': '🎇'
    '😃': next1 extends ('👾' | '👽') ? (prev1 extends ('🌑' | '🕶️') ? '👾' : current) : current
    '😎': next1 extends ('👾' | '👽') ? (prev1 extends ('🌑' | '🕶️') ? '👽' : current) : current
}, current>

type Up<T> = MatrixRotateAndScale<Left<MatrixRotateAndScale<T>>>
type Down<T> = MatrixRotateAndScale<Right<MatrixRotateAndScale<T>>>

type _Left<T> = { [K in keyof T]: Step<Index<T, Sub2<K>, ''>, Index<T, Sub1<K>, ''>, T[K], Index<T, Add1<K>, ''>, Index<T, Add2<K>, ''>> }
type Left<T> = { [K in keyof T]: _Left<T[K]> }

type _Right<T> = { [K in keyof T]: Step<Index<T, Add2<K>, ''>, Index<T, Add1<K>, ''>, T[K], Index<T, Sub1<K>, ''>, Index<T, Sub2<K>, ''>> }
type Right<T> = { [K in keyof T]: _Right<T[K]> }

type Combo<T> = {
    w: Combo<Up<T>>
    s: Combo<Down<T>>
    a: Combo<Left<T>>
    d: Combo<Right<T>>
    over: GameRender<T>
}

type GameRender<T> = Render<{
    [K in keyof T]: Join<T[K]>
}, [Combo<T>,
    Render<[
        'GameClear',
        'WoW',
        'MuchFun',
    ], null>
]['😃' extends Index<Index<T, number>, number> ? 0 : 1]>

export const TypeGame: { [K in keyof stages]: GameRender<stages[K]> } = null!