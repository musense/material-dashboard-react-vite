import React from "react";

const LogoImage = ({ className }) => {
    const logoDir = import.meta.env.VITE_LOGO_DIR;
    const description = import.meta.env.VITE_LOGO_TEXT;
    return <img
        src={`/src/assets/img/${logoDir}`}
        alt={description}
        className={className}
    />;
};

export default LogoImage;
