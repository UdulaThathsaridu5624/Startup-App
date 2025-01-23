"use client";

import { X } from "lucide-react";
import Link from "next/link";



export default function SearchFormReset() {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if (form) form.reset(); // Reset the form fields
    };

    return (
        <Link 
            href="/" 
            className="search-btn text-white" 
            onClick={reset} // Trigger the reset logic
        >
            <X className="size-5"/>
        </Link>
    );
}
