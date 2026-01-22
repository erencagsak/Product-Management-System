interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function Input({ label, className, ...props }: InputProps) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            
            <input
                className="block w-full rounded-md border border-gray-300 p-2 text-black focus:border-blue-500 focus:ring-blue-500"
                {...props}
            />
        </div>
    );
}