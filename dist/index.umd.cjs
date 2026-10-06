(function(e,t){typeof exports==`object`&&typeof module<`u`?t(exports,require("react/jsx-runtime")):typeof define==`function`&&define.amd?define([`exports`,`react/jsx-runtime`],t):(e=typeof globalThis<`u`?globalThis:e||self,t(e.ReactUI={},e.react_jsx_runtime))})(this,function(e,t){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});function n({variant:e=`primary`,size:n=`md`,className:r=``,children:i,...a}){return(0,t.jsx)(`button`,{className:`
        inline-flex
        items-center
        justify-center
        rounded-md
        font-medium
        transition-colors
        disabled:pointer-events-none
        disabled:opacity-50
        ${{primary:`bg-blue-600 text-white hover:bg-blue-700`,secondary:`bg-gray-100 text-gray-900 hover:bg-gray-200`,danger:`bg-red-600 text-white hover:bg-red-700`}[e]}
        ${{sm:`px-3 py-1.5 text-sm`,md:`px-4 py-2 text-sm`,lg:`px-5 py-3 text-base`}[n]}
        ${r}
      `,...a,children:i})}e.Button=n});