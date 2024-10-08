import styles from 'styled-components';
import image from "../style/images/SL_110720_37770_21.jpg";
import otherImage from "../style/images/SL_042620_30310_19.jpg"
import logo from "../style/images/TOPTECH_AUTOWORKS_LOGO.png";
import rightBG from "../style/images/lovelyredcarREAL.png";
import userIcon from "../style/images/user-svgrepo-com.svg"


const SignPage = styles.div`
    display: block;
    width: 100%;
    height: 100%;
    padding-top: 4.5rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    background-image: url(${image});
    background-size: cover;
    background-repeat: no-repeat;
    position:fixed;
    margin:0;
    top:0;
    left:0;
`
const SignBox = styles.div`
    position: relative;
    border-color: white;
    border-radius: 3.1rem;
    border-style: solid;
    background-color: white;
    width: 80rem;
    height: 38rem;
    margin: auto;
    /* padding: 0; */
    border: 0;
    background-image: url(${otherImage});
    background-size: cover;

    > .LoginLogo {
        padding-top: 18rem;
        height: 10%;
        width: 100%;
        background: url(${logo});
        background-position: left;
        background-position-x: 2.7rem;
        background-repeat: no-repeat;
        background-size: 35rem 10rem;
        position: absolute;
    }

    > .RegistLogo {
        padding-top: 5rem;
        height: 10%;
        width: 100%;
        background: url(${logo});
        background-position: right;
        background-position-x: 54rem;
        background-repeat: no-repeat;
        background-size: 13rem 4rem;
        position: absolute;
    }
`
const RightImage = styles.div`
    width: 100%;
    height: 100%;
    background-image: url(${rightBG});
    background-position: center;
    background-position-x: 41.5rem;
    background-position-y: -5rem;
    background-repeat: no-repeat;
    position: absolute;
    background-size: cover;
    border-radius: 3.1rem;
`
const LeftImage = styles.div`
    width: 100%;
    height: 100%;
    background-image: url(${rightBG});
    background-position: left;
    background-position-x: 39rem;
    background-position-y: -5rem;
    background-repeat: no-repeat;
    position: absolute;
    background-size: cover;
    border-radius: 3.1rem;
    transform: scaleX(-1);
`

const LoginDiv = styles.div`
    width: 52vw;
    height: 35vh;
    display: block;
    z-index: 100;
    position: relative;

    > form {
        z-index: 100;
        width: 46rem;
        border: none;
        justify-content: center;
        padding-top: 17rem;
        margin-left: 4.7rem;
    }

    input {
        width: 32rem;
        min-height: 3rem;
        margin-bottom: 1rem;
        padding-left: 3.5rem;
        background-repeat: no-repeat;
        background-size: 1.5rem;
        background-position: 1rem;
        font-size: 20px;
        border: none;
        background-color: #D0D0D0;
        border-radius: 2rem;
    }

    input[type="button"] {
        text-decoration: none;
        color: white;
        cursor: pointer;
        background-color: #990000;
        padding: 0px; /* this makes it different from the other input */
    }

    input[name="username"] {
        background-image: url(${userIcon});
    }

    input[name="password"] {
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA6PAAAOjwHjOWJ6AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAtBQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjcMAnQAAAO90Uk5TAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHiAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs9Pj9AQUJERUZHSUpMTU5PUFFSU1RVVldZWltcXV9gYWJjZGVmZ2hpamxtbm9wcXJzdHV2d3h5ent8fX5/gIGCg4aHiImKi4yNjo+RkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqutrq+wsbKztLW2uLm6u7y9vr/AwcLDxcbHyMnKzM3Oz9DR0tPU1dbX2Nna29zd3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f55IfRLAAARgElEQVR42u3d+3+WdR3H8WsbG4PhhiIgEjQwcZzyFIxDEockwAMigkOy1ETCQrQEsjgYCOUpSRumuXUgZSDGZGToTMRChymMQOYBEIEBN9z3/f0X+iHr0UFx2/fzvb6H6/X+C+735/OEXfd1X4coSlLade1XPn76rIUrH6/Z0vDe8RMf5/h7DVtqHl+5cNb08eX9uraLSHApGDxtcc3Ow6pFObyzZvG0wQVMLYjklE78ftX2U6rVObW96vsTS3OYoL8pGn3bqpeOKK0ceWnVbaOLmKV/GTS3NqWEkqqdO4iJepQzpzz2jhLOO49NOZPJepDcoQu2pJWRpLcsGJrLhF3OORVP7VdGs/+pinOYs6Nf9a7ZkFExJLPhGr4iupcLlr2vYsv7yy5g4i6lY8ULKua8UNGRuTuSix88pCzk0IMXM3v7KbnlFWUtr9xSwgasZmBls7Ka5sqBbMFa+j2VUdaTeaofm7CSvqvTyomkV/dlG7Gn96pTypmcWtWbjcSacx9IKaeSeuBcthJbuq84rpzL8RXd2Uws6bK0WTmZ5qVd2I7xFMw/rJzN4fn8SmA4I95QTueN4ezIYIofzCrHk73/DPZkKpP2Kg+yZwKbMpJzfqM8SRXfB+STc+OHypscuIGFCecLm5RX2cjZYcm0u+u48izH5uaxN6kMfk15mFf6szmZTGtWXubIFHYnkPyVytss405j/S9/LyiPU9eNDWqe+t2nvM7ecnaok1tPKs+TuoUttjkdfqkCyOoObLJt6bNNBZFXS9llW3L5QRVIDl7ONlt/7n9BRgWTzAIeNdPK5D6qgsqjPFigdWd/qlVgqc5nqy1PYY0KLjWF7LWl6fS8CjDPd2KzLUvnF1WQebEzu21Jum1TgWYbvwy0ID0bVLBp6Ml+P/P03y4VcHb1YcOnT/93VNB5h8uETpuLP1CB5wMeLHSaDDqkgs8hHjv86cd/e1QCsocjwU/JGdtUIrKNuwc/Me2eVQnJs1wr+klZpRKTVWz7//M9laB8j33/b67LJglA9jo2/t+5LKUSldRl7Pw/c8FBlbAc5IHz/5Huu1TisounSPw7HV9WCczLvHDg4+T8XiUyv+dS4X9mjkpo5rD7KIqii1JJBZC6iO1HUccdKrHZwWFAFP1cJTg/Z//XqETnmqTvv/eHyQbwYcLfNJFn5QEwTZtW3Tt/9szJXx02sHfvgcO+Onnm7Pn3rtrUZOOzvJDsp8ktjHfaJxvWLK4Y+qmveisZWrF4TUPMDyVZmOT9j4jxtU8n6uaPaNENmvkj5tediO9zpUckd/+dG+Macv2iMa16UEuHMYvq48LZmNw7xuK5B/x41aTitny64klV8Tygtjqp+58Zx3RfvEnjH1jnm2K5T3VmMvff1fxNAHsWab/Vs98i89eqH+rKKUADya4ZJ/Jcltxxa0xfrpbIE4JfMjvVzK8Hy33Wwb82+8Sq7JeSt/+cl4we9j9ZJvtxy540+qXgpeRdGjDD4DhPVZ4v/4HPrzT5suIZSdt/8bvmhvm4oZvw+zxu7jO/W5wwAMuNjbJhlLlPPcrc00uWJ2v/ZaZOuB83+/LWgvmmzg2dLEsUgOcMjfG580x/8vOMffQk7f9KQ39Ip8bx4acaOny5Mjn7L9xlZIJVMf2q0rnKyMfflZxHiS4w8nPvt+Ir8C0jPxcvSMr+ex8zML2dl8RZ4ZKdBiocS8rlYSaeBPG7kng7lPzOQImEPDeih/z/nyct3GMzR/6b7IkeiQCwVHxwdt7NVr5XvMjSJOy/5CPxc3+97DTpJX5e8KOSBACYJz21+i62qnSpl+4yL/z9t5e++n5Dkb0yRRuEyzS1Dx7AN6TP/hTYbFMgfU7oG6HvP/dvsgO73/LbuHLvl+3zt9DfLna17LwcuK1G+OamqwMHIPs0oB+7UOnHopVeDnv/XxEd1pNOXEmX86Roqa8EDUD0edAbC9woVbBRstWzIe//QslJverMZXTFr0r2ujBgAL+S/PncoRPnPSQvcPhVuPs/U/B5YPv7udSs3365ZqkzgwXwTcHf/4a7VW244G+D3wwWwGa5ITn3jEXBp11uDnX/veTuBnzavXZPi5XL9goUwB1iI9p9lnvtztotVu+OQAG8JjWgU8NdrDdc7N7B18Lc/8DQ/4XI/Q83MEgAi6XGs97Re6lz1ks1XBzi/nOkHgm272xXK569T6hiY4iPCxgp9c/jWnc7XivVcWSAAB4Wmk2tyyVrhUo+FN7+8w8InQJ0+jZqqdveD+QHB2CC0L+Ne92uea9QzQnBARC6enJvJ7drdhK6W6QqtP0XCt0QOsX1olNkeh4L7V7xUUIXAbnfVOjyoFGBAfiByFQy/d1v2l/mmZI/CAxAnchUvHiutswz0OsCOwSQuSX8iz50/aJI1RNhHQTIHALU+FG2hoMAQ4cAw/woO4yDADOHAM/70vZ5DgKMHAKM8aXuGA4C/icid4TV+9NX5MERId0jdo/EQK7wp+8VEn3vCQiAxPXg73r0is08iafJBnR1uMghwAqfGq/gIED8EOASnxpfwkGA9CHAG35VfoODAOHvxXf5VfmuJJ33+MwIPBku69mDlHsL3AbXFMr+i5N4Xkzi3GcoL5K6VGAWX/et9NcFSl8aCIBp+qNIe/eK9c4CL5qcxpcAD08DC54ODuVrgMAFwR7eLCdwK2QolwZv1R/FWP9aj9VvvTUQAEe1J5Hq6F/rjvpPxDoaxv57JvR3EYFfwHoGAUDgl4CFPvYWeIp0GL8G3JzQu6UF7oe/OQgA92nPobnAx94FzdrF7wsCwLqkXh+pfzZ4XRAA3tKew8N+Ftd/JMZbIey/QP+c6Bw/m+s/PDRdEACAXvrHQuP9bD5ev3kIzwwt0x9DXz+b99VvXhYAgCH65wHz/Gyep38ucEgAAEZrT+F1X6u/rl19dAAAJmlPYY2v1ddoV58UAAD9y0GW+Fp9CZeERBJngm/0tfqNnAuOoui72lO4ytfqV2lX/24AAPQvCBvra3X9a0JCuChsufYUyn2tXq5dfXkAAB7RnkJ/X6v3167+SAAA9F8W6e35UP2z4CG8RHKt9hRKfK1eol19bQAANmlPIc/X6nna1TcFAODPCb42Vvt66D8HAGBHgm+S1b4tekcAAHbpDqHR3+7a78naFQCARgAksjtDAABDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0BwDdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdGQLdLSa/z9Dyf0X7kelN5d5GsPvQPvl+7L7n3F/U7U4rIp707rpfzO3p9vbzJjzD7s0qeGaCu2/Q6bBwLxsyn70LO7i5/yE7WE482THExeO+H/Gff3x/CH7k3BFh/62sJc5sdex1qgP2s5N4s3+AS/vvu4+NxJ19fd3Zf69G9hF/Gp15p3L3N9mGjbzZ3Y39525hF3byp1wnAMxhE7Yy24kDwGYWYStHP29//zmb2IO9PGcfwM1swWZusL3/LodZgs0cLLEMYB47sJs5li8A2M0K7Gan3a+CV7EB25loFQBfAayn1ub+BzF/+xloEcBKxm8/Ky0C2M747We7vf2fnWX89pM92xqAK5m+C7nSGoAVDN+FrLAGgAtBnchWW/svyTB8F5Kx9XtAObN3I+WWAHyN0buRr1kCcAOjdyO2LgqYy+jdyFxLAJYyejey1BKARxm9G3nUEoCnGb0beZqLAZKdTZYA1DF6N1IHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDoAUAA4GGyf699+DsTL7rw41w04faHNu7OACARAJqfuHpg4SfVKRxw1eojAAgbQGZjRafTVSqaviEDgGABvD7vc5/d6ty5fwFAkADeHt/SYuPeBEBwAI4vLGx5s/Z3HwNAWADW9Wldt9K1AAgIQOOk1reb1AiAUADUFLWlXlENAMIAUNmubf3aVQIgBAAar1VcCgDvAWRv16l4exYAfgM4OV2v4/STAPAZQHaibsmJWQB4DOCH+i1/CAB/AdTm6rfMrQWArwD2dZOo2W0fAPwEkP6yTM8vpwHgJYB5UkXnAcBHAOtzpIrmrAeAfwAyZXJNyzIA8A7AE5JVnwCAbwDS50tWPT8NAM8ArJbtuhoAfgE4dZ5s1/NOAcArAI9Jl30MAD4BSJdKly1NA8AjAH+Ub/tHAHgE4E75tncCwCMAg+XbDgaAPwD2mqi7FwDeAHjERN1HAOANgCtM1L0CAL4ASHUyUbdTCgCeANhspu9mAHgCoNJM30oAeAJgkZm+iwDgCYBZZvrOAoAnACab6TsZAJ4AGGGm7wgAeAKg1EzfUgB4AqDQTN9CAPgB4JCpwocA4AWAlKnCKQD48SfgLDN9z+JPgCcABpjpOwAAngAYY6bvGAB4AuB6M32vB4AnAO4w0/cOAHgCYIWZvisA4AmAKjN9qwDgCYB6M33rAeAJgExXE3W7ZgDgCQA1w0TdGQoAvgD4rYm6vwWANwCOtJdv2/4IALwBoC6Xb3u5AoA/AB6Sb/sQADwCsEe+7R4AeARADZcuO1wBwCcAtdJlawHgFQA1TrbrOAUAvwBszZGsmrMVAJ4BUFMlq05VAPANwM58uab5OwHgHQB1q1zTWxUA/APwXrFU0eL3AOAhALUuV6Zn7joFAB8BqGUyPZcpAPgJQM2UqDlTAcBXAKmR+i1HpgDgLQD1QaluydIPFAD8BaD+eoZexzP+qgDgMwBVodexQgHAbwCa14fOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJIHYLZex9kA8BzAEr2OSwDgOYDVeh1XA8BzAI16HRsB4DkAdalOxUsVAHwHsEyn4jIAeA/gaI+2N+xxFADeA1A/a3vDnykA+A8gPbqtBUenARAAAHWgb9v69T2gABACANXQqy31ejUoAIQBQDUNaX27IU0KAKEAUMcWFLWuW9GCYwoA4QBQqum27i1v1v22Jp+6AaBFyWy+u2LMhZ+ZMRV3b8741QwACQ8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnD4bGb0b2WgJQDWjdyPVlgA8wOjdyAOWANzD6N3IPZYAzGL0bmSWJQBTGb0bmWoJwFhG70bGWgIwiNG7kUGWAOR9xOxdyEd5lgBE6xm+C1lva//RnQzfhdxpDcAwhu9ChlkDkN/M9O2nOd8aAH4OciEb7e0/+jbjt59vWwTQmb8B1nO0xCIAX96rFnIetLl/TgbaT5lVAFwWZjt/sLv/aDIrsJsJlgG0284ObObVXMsAoqEZtmAv6Ysj67mPNdjLUvv7jzruZA+28lYHBwBEo7Nswk6yoyIn8lNWYSc/cWP/US53iFhJda4jAKL8tWwj/qzNj5xJYS37iDu1hZFDKdrCRuLNlqLIqRQu57tAnMf/ywsj1zKqkb3ElcZRkYMprmQz8aSyOHIzl1WfZDumc7L6ssjddJv3NisymbfndYvcTs7Im5ZU17/PqqTzfn31kptG5kjv6x+Ng/RtvYrM4gAAAABJRU5ErkJggg==);
    }
`

const RegisterDiv = styles.div`
    width: 52vw;
    height: 40vh;
    display: block;
    z-index: 100;
    position: relative;

    > form {
        z-index: 100;
        width: 85rem;
        border: none;
        justify-content: center;
        padding-top: 5rem;
        padding-left: 45rem;
    }
    
    input {
        width: 32rem;
        min-height: 3rem;
        margin-bottom: 1rem;
        padding-left: 3.5rem;
        background-repeat: no-repeat;
        background-size: 1.5rem;
        background-position: 1rem;
        font-size: 20px;
        border: none;
        background-color: rgb(245,245,245);
        border-radius: 2rem;
    }

    input[name="firstName"] {
        width: 16rem;
        min-height: 3rem;
    }

    input[name="lastName"] {
        width: 16rem;
        min-height: 3rem;
    }

    input[type="button"] {
        text-decoration: none;
        color: white;
        cursor: pointer;
        background-color: #990000;
        padding: 0px; /* this makes it different from the other input */
    }

    input[type="text"] {
        background-image: url(${userIcon});
    }

    input[type="password"] {
        background-image: url(data:image/png;base64,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);
    }
`

const SignUp = styles.div`
    text-align: center;
    width: 70%;
    p {
        margin-top: -0.3rem;
        font-weight: 800;
    }

    .registerDialogue{
        width:100%;
        padding-left:4rem;
        margin-top: 0.5rem;
    }
`


export {SignPage, SignBox, RightImage, LoginDiv, SignUp, LeftImage, RegisterDiv}