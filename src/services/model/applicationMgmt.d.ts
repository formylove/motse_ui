namespace getApplicationsListRes {

    export interface Application {
        apitoken: string;
        clientId: string;
        issuer: string;
        loginRedirectUrl: string[];
        logoutRedirectUrl: string[];
        name: string;
        platform: 'NATIVE'| 'SPA'| 'WEB'| 'SERVICE';
        ssoProvider: string;
    }

    export interface RootObject {
        data: Application[];
        errCode: number;
        errMsg: string;
        pageNum: number;
        pageSize: number;
        totalElements: number;
        totalPage: number;
    }

}
