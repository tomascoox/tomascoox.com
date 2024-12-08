import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const IMG_PADDING = 12;

export const TextParallaxContent = ({ 
  imgUrl, 
  subheading, 
  heading,
  title,
  description,
  buttonText = "Learn more",
  onButtonClick,
}: TextParallaxContentProps) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[110vh]">
        <StickyImage imgUrl={imgUrl}>
          <OverlayCopy 
            heading={heading} 
            subheading={subheading}
            title={title}
            description={description}
            buttonText={buttonText}
            onButtonClick={onButtonClick}
          />
        </StickyImage>
      </div>
    </div>
  );
};

const StickyImage = ({ imgUrl, children }: { imgUrl: string; children: React.ReactNode }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, 
    [0, 0.4, 0.5, 0.7], 
    [0.5, 1, 1, 0.5]
  );
  
  const imageOpacity = useTransform(scrollYProgress,
    [0, 0.4, 0.5, 0.7],
    [0, 1, 1, 0]
  );

  const imageY = useTransform(scrollYProgress,
    [0, 0.4, 0.5, 0.7],
    [100, 0, 0, -100]
  );

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 4}px)`,
        top: IMG_PADDING * 2,
        scale,
        opacity: imageOpacity,
        y: imageY,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity: imageOpacity,
        }}
      />
      {children}
    </motion.div>
  );
};

const OverlayCopy = ({ 
  subheading, 
  heading,
  title,
  description,
  buttonText,
  onButtonClick,
}: { 
  subheading: string; 
  heading: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Delay content animation relative to image animation
  const y = useTransform(scrollYProgress, 
    [0, 0.5, 0.55, 0.7], 
    [200, 0, 0, -200]
  );
  const opacity = useTransform(scrollYProgress, 
    [0, 0.5, 0.55, 0.7], 
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      {/* Heading content */}
      <div className="text-center mb-4">
        <p className="mb-2 text-center text-lg md:mb-4 md:text-2xl">
          {subheading}
        </p>
        <p className="text-center text-3xl font-bold md:text-6xl">{heading}</p>
      </div>

      {/* Content section with staggered animation */}
      <motion.div 
        className="max-w-xl mx-auto px-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {title}
        </h2>
        <p className="text-lg text-gray-200 mb-6 text-center">
          {description}
        </p>
        {buttonText && (
          <div className="text-center">
            <button
              onClick={onButtonClick}
              className="inline-flex items-center rounded border border-white bg-transparent px-8 py-3 text-lg text-white transition-colors hover:bg-white/10"
            >
              {buttonText} <FiArrowUpRight className="ml-2" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}; 