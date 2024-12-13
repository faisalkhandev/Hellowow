import HeaderBar from "@/components/common/HeaderBar";
import React from "react";

const ToolsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <HeaderBar
        title="Want NifaWow Updates? No Spam."
        showReadMore={true}
        showSubscribe={false}
      />
      {children}
    </>
  );
};

export default ToolsLayout;
