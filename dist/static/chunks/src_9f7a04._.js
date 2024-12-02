(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_9f7a04._.js", {

"[project]/src/lib/arconnect.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "arweave": (()=>arweave),
    "connectToArConnect": (()=>connectToArConnect),
    "disconnectFromArConnect": (()=>disconnectFromArConnect),
    "isWalletConnected": (()=>isWalletConnected)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arweave$2f$web$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/arweave/web/index.js [app-client] (ecmascript)");
;
const arweave = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arweave$2f$web$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});
// Helper to safely get the wallet instance
const getWallet = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return window.arweaveWallet || window.arconnect || null;
};
// Enhanced browser detection to include ArConnect mobile app
const getBrowserInfo = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const userAgent = navigator.userAgent.toLowerCase();
    // Check if ArConnect mobile app is available
    const isArConnectMobile = "object" !== 'undefined' && (getWallet() !== null || window?.location?.href?.includes('arconnect://'));
    if (userAgent.includes('mobile')) {
        if (isArConnectMobile) return 'arconnect-mobile';
        if (userAgent.includes('ios')) return 'ios';
        if (userAgent.includes('android')) return 'android';
        return 'mobile';
    }
    return 'desktop';
};
// Updated installation instructions for mobile
const getInstallationInstructions = ()=>{
    const browser = getBrowserInfo();
    switch(browser){
        case 'arconnect-mobile':
            return null;
        case 'ios':
            return 'Please install ArConnect from the App Store: https://apps.apple.com/app/arconnect/id1607894720';
        case 'android':
            return 'Please install ArConnect from the Play Store: https://play.google.com/store/apps/details?id=io.arconnect.mobile';
        case 'mobile':
            return 'Please install ArConnect mobile app for your device';
        case 'desktop':
            return 'Please install ArConnect from https://arconnect.io';
        default:
            return 'Please install ArConnect from https://arconnect.io';
    }
};
// Enhanced ArConnect check for both mobile and desktop
const checkForArConnect = ()=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return getWallet() !== null || window?.location?.href?.includes('arconnect://');
};
// Modified wait function with mobile support
const waitForArConnect = async (timeout = 2000)=>{
    const start = Date.now();
    while(Date.now() - start < timeout){
        if (checkForArConnect()) return;
        await new Promise((resolve)=>setTimeout(resolve, 100));
    }
    const instructions = getInstallationInstructions();
    if (instructions) {
        throw new Error(instructions);
    }
};
async function connectToArConnect() {
    try {
        await waitForArConnect();
        if (!checkForArConnect()) {
            const instructions = getInstallationInstructions();
            if (instructions) {
                throw new Error(instructions);
            }
        }
        const wallet = getWallet();
        if (!wallet) {
            throw new Error('ArConnect wallet not found');
        }
        // Request permissions
        await wallet.connect([
            'ACCESS_ADDRESS',
            'SIGN_TRANSACTION',
            'ACCESS_ADDRESS',
            'SIGN_TRANSACTION',
            'ACCESS_PUBLIC_KEY',
            'SIGNATURE',
            'ACCESS_ALL_ADDRESSES',
            'ACCESS_ARWEAVE_CONFIG',
            'DECRYPT',
            'ENCRYPT',
            'DISPATCH'
        ]);
        // Get wallet address
        const address = await wallet.getActiveAddress();
        if (!address) {
            throw new Error('Failed to get wallet address. Please try again.');
        }
        return address;
    } catch (error) {
        const err = error;
        if (err.code === 'PERMISSION_DENIED') {
            throw new Error('Connection rejected. Please approve the connection request.');
        }
        if (err.message?.includes('timeout')) {
            const instructions = getInstallationInstructions();
            throw new Error(instructions || 'Connection timed out. Please try again.');
        }
        throw new Error(err.message || 'Failed to connect to ArConnect. Please try again.');
    }
}
async function disconnectFromArConnect() {
    if (checkForArConnect()) {
        try {
            const wallet = getWallet();
            if (wallet) {
                await wallet.disconnect();
            }
        } catch (error) {
            console.error('Error disconnecting from ArConnect:', error);
            throw new Error('Failed to disconnect from ArConnect');
        }
    }
}
async function isWalletConnected() {
    if (!checkForArConnect()) return false;
    try {
        const wallet = getWallet();
        if (!wallet) return false;
        const address = await wallet.getActiveAddress();
        return !!address;
    } catch  {
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ArConnectPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$arconnect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/arconnect.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
function ArConnectPage() {
    _s();
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnecting, setIsConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check initial wallet connection status on component mount
        const checkWalletStatus = async ()=>{
            try {
                const connected = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$arconnect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWalletConnected"])();
                if (connected) {
                    const walletAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$arconnect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectToArConnect"])();
                    setAddress(walletAddress);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        checkWalletStatus();
    }, []);
    const handleConnect = async ()=>{
        setIsConnecting(true);
        setError(null);
        try {
            const walletAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$arconnect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["connectToArConnect"])();
            setAddress(walletAddress);
        } catch (err) {
            setError(err.message);
        } finally{
            setIsConnecting(false);
        }
    };
    const handleDisconnect = async ()=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$arconnect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disconnectFromArConnect"])();
            setAddress(null);
        } catch (err) {
            setError(err.message);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto p-6 bg-white shadow-md rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-4",
                children: "ArConnect Wallet"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this),
            address ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Connected Wallet:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono break-all",
                                children: address
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDisconnect,
                        className: "w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition",
                        children: "Disconnect Wallet"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleConnect,
                disabled: isConnecting,
                className: `w-full py-2 rounded transition ${isConnecting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`,
                children: isConnecting ? 'Connecting...' : 'Connect ArConnect Wallet'
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(ArConnectPage, "OJd0HphdPBC4hS/82V3vCOUqBS4=");
_c = ArConnectPage;
var _c;
__turbopack_refresh__.register(_c, "ArConnectPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_9f7a04._.js.map