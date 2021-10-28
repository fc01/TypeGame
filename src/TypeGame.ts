import { stages } from './stages'
import { Index, Add1, Sub2, Sub1, Add2, Join, Render, MatrixRotateAndScale } from './utils'

/*
单个元素 下一步
相对方向  主角前进的方向
current 当前元素
prev1 后面1个元素
prev2 后面2个元素
next1 前面1个元素
next2 前面2个元素
*/
type Step<prev2, prev1, current, next1, next2> = Index<{
    //地板
    '🌑': next1 extends ('👾' | '👽') ? '👾' : next1 extends ('😃' | '😎') ? (next2 extends ('👾' | '👽') ? '😃' : current) : current

    //目标
    '🕶️': next1 extends ('👾' | '👽') ? '👽' : next1 extends ('😃' | '😎') ? (next2 extends ('👾' | '👽') ? '😎' : current) : current

    //主角
    '👾': prev1 extends ('🌑' | '🕶️') ? '🌑' : prev1 extends ('😃' | '😎') ? (prev2 extends ('🌑' | '🕶️') ? '🌑' : current) : current

    //主角+目标
    '👽': prev1 extends ('🌑' | '🕶️') ? '🕶️' : prev1 extends ('😃' | '😎') ? (prev2 extends ('🌑' | '🕶️') ? '🕶️' : current) : current

    //砖块
    '🎇': '🎇'

    //箱子
    '😃': next1 extends ('👾' | '👽') ? (prev1 extends ('🌑' | '🕶️') ? '👾' : current) : current

    //箱子+目标
    '😎': next1 extends ('👾' | '👽') ? (prev1 extends ('🌑' | '🕶️') ? '👽' : current) : current
}, current>

//上下左右
type Up<T> = MatrixRotateAndScale<Left<MatrixRotateAndScale<T>>>
type Down<T> = MatrixRotateAndScale<Right<MatrixRotateAndScale<T>>>

type _Left<T> = { [K in keyof T]: Step<Index<T, Sub2<K>, ''>, Index<T, Sub1<K>, ''>, T[K], Index<T, Add1<K>, ''>, Index<T, Add2<K>, ''>> }
type Left<T> = { [K in keyof T]: _Left<T[K]> }

type _Right<T> = { [K in keyof T]: Step<Index<T, Add2<K>, ''>, Index<T, Add1<K>, ''>, T[K], Index<T, Sub1<K>, ''>, Index<T, Sub2<K>, ''>> }
type Right<T> = { [K in keyof T]: _Right<T[K]> }

//连招
type Combo<T> = {
    w: Combo<Up<T>>
    s: Combo<Down<T>>
    a: Combo<Left<T>>
    d: Combo<Right<T>>
    over: GameRender<T>
}

//渲染
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