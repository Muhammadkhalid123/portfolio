"use client";

import styled, { keyframes, css } from "styled-components";

const cyanPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 208, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 255, 208, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 208, 0);
  }
`;

const floatAnim = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
`;

export const StyledPulseDot = styled.span<{ $color?: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color || "#00FFD0"};
  animation: ${cyanPulse} 2s infinite ease-out;
`;

export const StyledCreativePill = styled.div<{ $interactive?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: rgba(15, 15, 15, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(15, 15, 15, 0.1);
  color: #0F0F0F;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: all 0.25s cubic-bezier(0.2, 0.715, 0.205, 0.99);

  ${({ $interactive }) =>
    $interactive &&
    css`
      cursor: pointer;
      &:hover {
        border-color: rgba(0, 255, 208, 0.6);
        background: rgba(0, 255, 208, 0.08);
        box-shadow: 0 4px 16px rgba(0, 255, 208, 0.15);
        transform: translateY(-1px);
      }
    `}
`;

export const StyledFloatBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  animation: ${floatAnim} 4s ease-in-out infinite;
`;
