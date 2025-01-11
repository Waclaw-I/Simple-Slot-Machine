import background from './background.jpg'
import high1 from './high1.png'
import high2 from './high2.png'
import high3 from './high3.png'
import low1 from './low1.png'
import low2 from './low2.png'
import low3 from './low3.png'
import low4 from './low4.png'    
import reels_base from './reels_base.png'
import spin_btn_normal from './spin_btn_normal.png'
import spin_btn_down from './spin_btn_down.png'
import spin_btn_hover from './spin_btn_hover.png'
import spin_btn_over from './spin_btn_over.png'
import spin_btn_disabled  from './spin_btn_disabled.png'

const img = {
    reels_base,
    spin_btn_normal,
    spin_btn_down,
    spin_btn_hover,
    spin_btn_over,
    spin_btn_disabled,
    high1,
    high2,
    high3,
    low1,
    low2,
    low3,
    low4
}

export const urls = Object.freeze([
    {alias: 'background', src: background},
    ...Object.entries(img).map(([alias, src]) => ({alias, src}))
]);