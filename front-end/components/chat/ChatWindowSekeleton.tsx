import React from "react";

const SkeletonBubble = ({
  isRight = false,
  width = "w-48",
}: {
  isRight?: boolean;
  width?: string;
}) => (
  <div
    className={`flex gap-3 items-end ${isRight ? "justify-end" : "justify-start"}`}
  >
    {!isRight && <div className="w-8 h-8 rounded-xl shimmer flex-shrink-0" />}
    <div className={`${width} h-10 rounded-2xl shimmer`} />
    {isRight && <div className="w-8 h-8 rounded-xl shimmer flex-shrink-0" />}
  </div>
);

const ChatWindowSekeleton = () => {
  return (
    <div className="h-full flex flex-col gap-4 px-6 py-8 overflow-hidden">
      {/* Top messages */}
      <SkeletonBubble width="w-40" />
      <SkeletonBubble isRight width="w-56" />
      <SkeletonBubble width="w-64" />
      <SkeletonBubble isRight width="w-36" />
      <SkeletonBubble width="w-52" />
      <SkeletonBubble isRight width="w-44" />
      <SkeletonBubble width="w-32" />
      <SkeletonBubble isRight width="w-60" />
      <SkeletonBubble width="w-48" />
    </div>
  );
};

export default ChatWindowSekeleton;
