import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    wrap,
} from "framer-motion";
import "./Banner.css";
import { cn } from "@/lib/utils";

function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 2000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamically calculated
     * based on the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
        <div className="parallax">
            <motion.div className="scroller flex flex-nowrap" style={{ x }}>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
            </motion.div>
        </div>
    );
}

const banner = {
    animate: {
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.1,
        },
    },
};

const letterAni = {
    initial: { y: 400 },
    animate: {
        y: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1,
        },
    },
};

const Banner = () => {
    const [playMarquee, setPlayMarquee] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setPlayMarquee(true);
        }, 2000);
    }, []);
    return (
        <motion.div
            className="z-30 relative h-[calc(100vh-4rem)] test"
            variants={banner}
        >
            <BannerRowTop title={"mdocs"} />
            <BannerRowCenter title={"experience"} playMarquee={playMarquee} />
        </motion.div>
    );
};

const AnimatedLetters = ({ title, disabled }) => (
    <motion.span
        className="whitespace-nowrap"
        variants={disabled ? null : banner}
        initial="initial"
        animate="animate"
    >
        {[...title].map((letter, i) => (
            <motion.span
                className={cn("row-letter", letter === "_" ? "opacity-0" : "")}
                variants={disabled ? null : letterAni}
                key={i + letter}
            >
                {letter}
            </motion.span>
        ))}
    </motion.span>
);

const BannerRowTop = ({ title }) => {
    return (
        <div className={"banner-row"}>
            <AnimatedLetters title={title} />
            <motion.p
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1,
                    delay: 0.4,
                }}
                className="p-8 font-medium uhh "
            >
                It is the connected workspace where your ideas, plans and notes
                unified.
            </motion.p>
            {/* <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1,
                    delay: 0.4,
                }}
                className="row-col"
            ></motion.div> */}
        </div>
    );
};

const BannerRowCenter = ({ title, playMarquee }) => {
    return (
        <div className={`banner-row marquee pl-8`}>
            <ParallaxText baseVelocity={playMarquee ? -5 : 0}>
                <AnimatedLetters title={"simple__efficient__productive__"} />
            </ParallaxText>
        </div>
    );
};

export default Banner;
