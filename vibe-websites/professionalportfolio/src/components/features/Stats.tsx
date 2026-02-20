import React, { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import Modal from '../ui/Modal';

const stats = [
    {
        label: "Projects Built",
        value: 24,
        suffix: "",
        details: "From AI tools to E-commerce platforms. Notable works include a Neural Network visualizer and a Crypto Dashboard."
    },
    {
        label: "Hours of Code",
        value: 1200,
        suffix: "+",
        details: "Tracked via WakaTime. Heaviest activity in React, TypeScript, and Rust."
    },
    {
        label: "Coffee Cups",
        value: 450,
        suffix: "",
        details: "Powered by Espresso and late-night debugging sessions."
    },
    {
        label: "Contributions",
        value: 156,
        suffix: "",
        details: "Active in open source communities, fixing bugs and improving documentation."
    },
];

const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
    const [displayValue, setDisplayValue] = React.useState(0);

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [springValue]);

    return <span ref={ref}>{displayValue}{suffix}</span>;
};

const Stats: React.FC = () => {
    const [selectedStat, setSelectedStat] = useState<typeof stats[0] | null>(null);

    return (
        <>
            <div id="stats" className="py-20 bg-black/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 cursor-pointer group"
                            onClick={() => setSelectedStat(stat)}
                        >
                            <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600 group-hover:to-primary transition-all">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </h3>
                            <span className="text-gray-400 text-sm uppercase tracking-wider group-hover:text-white transition-colors">
                                {stat.label}
                            </span>
                            <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                View Details
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={!!selectedStat}
                onClose={() => setSelectedStat(null)}
                title={selectedStat?.label}
            >
                <p className="text-lg text-gray-300 leading-relaxed">
                    {selectedStat?.details}
                </p>
            </Modal>
        </>
    );
};

export default Stats;
