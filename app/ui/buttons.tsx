'use client';

export function WideButton(
    {onClick, active, children}:
    {
        onClick?: () => void,
        active?: boolean,
        children: React.ReactNode
    }
) {
    return (
        <div className={`w-full h-10 border border-gray-600 rounded
            hover:shadow-xl hover:font-bold
            flex justify-center items-center cursor-pointer
            trarnsition-all duration-300
            ${active ? 'bg-slate-400 text-gray-100' : 'bg-transparent text-gray-800'}`}
            onClick={() => onClick && onClick()}>
            {children}
        </div>
    );
}