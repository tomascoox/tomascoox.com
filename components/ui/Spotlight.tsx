import React from 'react'
import { cn } from '@/utils/cn'

// The Spotlight component creates a customizable SVG spotlight effect.
// It renders an SVG element with an ellipse shape that simulates a spotlight or glow effect.

// SpotlightProps defines the props for the Spotlight component
type SpotlightProps = {
    className?: string // Optional CSS class name for additional styling
    fill?: string // Optional fill color for the spotlight effect
}

// Spotlight component
export const Spotlight = ({ className, fill }: SpotlightProps) => {
    return (
        <svg
            // Combines default classes with any additional classes passed as props
            className={cn(
                'animate-spotlight pointer-events-none absolute z-[1]  h-[169%] w-[138%] lg:w-[84%] opacity-0',
                className
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
        >
            {/* Group with filter applied for the spotlight effect */}
            <g filter="url(#filter)">
                {/* Ellipse shape creating the spotlight effect */}
                <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="273.501"
                    // Transformation matrix for positioning and skewing the ellipse
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill || 'white'} // Uses provided fill color or defaults to white
                    fillOpacity="0.21"
                ></ellipse>
            </g>
            {/* Definitions for filters used in the SVG */}
            <defs>
                <filter
                    id="filter"
                    x="0.860352"
                    y="0.838989"
                    width="3785.16"
                    height="2840.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    {/* Filter effects for creating the spotlight blur */}
                    <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                    ></feFlood>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    ></feBlend>
                    <feGaussianBlur
                        stdDeviation="151"
                        result="effect1_foregroundBlur_1065_8"
                    ></feGaussianBlur>
                </filter>
            </defs>
        </svg>
    )
}

// This component is used to add visual interest to layouts, such as in the Hero component,
// where multiple Spotlight instances are positioned to create dynamic visual effects.
