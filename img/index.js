import background from "./background.jpg";
import high1 from "./high1.png";
import high2 from "./high2.png";
import high3 from "./high3.png";
import low1 from "./low1.png";
import low2 from "./low2.png";
import low3 from "./low3.png";
import low4 from "./low4.png";
import high1_blurred from "./high1_blurred.png";
import high2_blurred from "./high2_blurred.png";
import high3_blurred from "./high3_blurred.png";
import low1_blurred from "./low1_blurred.png";
import low2_blurred from "./low2_blurred.png";
import low3_blurred from "./low3_blurred.png";
import low4_blurred from "./low4_blurred.png";
import reels_base from "./reels_base.png";
import spin_btn_normal from "./spin_btn_normal.png";
import spin_btn_down from "./spin_btn_down.png";
import spin_btn_hover from "./spin_btn_hover.png";
import spin_btn_over from "./spin_btn_over.png";
import spin_btn_disabled from "./spin_btn_disabled.png";
import machine_front from "./machine_front.png";

const img = {
    reels_base,
    machine_front,
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
    low4,
    high1_blurred,
    high2_blurred,
    high3_blurred,
    low1_blurred,
    low2_blurred,
    low3_blurred,
    low4_blurred
};

export const urls = Object.freeze([
    { alias: "background", src: background },
    ...Object.entries(img).map(([alias, src]) => ({ alias, src }))
]);
