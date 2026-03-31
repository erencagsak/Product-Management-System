"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-red-200 rounded-lg bg-red-50 text-center space-y-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Bir şeyler ters gitti!</h3>
                        
                        <p className="text-sm text-gray-600 max-w-xs mx-auto">
                            Bu bileşen görüntülenirken beklenmeyen bir hata oluştu.
                        </p>
                    </div>

                    <Button 
                        variant="outline" 
                        onClick={() => {
                            this.setState({ hasError: false });
                            window.location.reload();
                        }}
                        className="border-red-200 hover:bg-red-100 text-red-700"
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        
                        Sayfayı Yenile
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;