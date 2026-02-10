import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.service";
import { Role } from "./constants/roles";

export async function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    let isAuthenticated = false;
    let isCustomer = false;
    let isProvider = false;
    let isAdmin = false;

    const {data: session} = await userServices.getSessionServer()

    if (session) {
        isAuthenticated = true;
        isCustomer = session.user.role === Role.CUSTOMER;
        isProvider = session.user.role === Role.PROVIDER;
        isAdmin = session.user.role === Role.ADMIN;
    }

    if( !isAuthenticated ) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!isCustomer && pathName.startsWith("/dashboard")) {
        if(isProvider) {
            return NextResponse.redirect(new URL('/provider-dashboard', request.url))
        }
        if(isAdmin) {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }
    }
    
    if(!isProvider && pathName.startsWith("/provider-dashboard")) {
        if(isCustomer) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        if(isAdmin) {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }
    }

    if(!isAdmin && pathName.startsWith("/admin-dashboard")) {
        if(isCustomer) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        if(isProvider) {
            return NextResponse.redirect(new URL('/provider-dashboard', request.url))
        }
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        "/admin-dashboard",
        "/admin-dashboard/:path*",
        "/provider-dashboard",
        "/provider-dashboard/:path*",
        "/dashboard",
        "/dashboard/:path*",
    ]
}