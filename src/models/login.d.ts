declare namespace LogInType {
    interface LogInForm {
        userName: string,
        password: string
    }

    type LogInStatus = 0 | 1 | 2

    interface PersonalInformation {
        userName: string,
        team: string,
        avatar: string,
        reserchInterest: Array<string>,
        Organizations: Array<string>,
    }

    interface LogInInformation {
        personalInformation: PersonalInformation | null,
        logInStatus: LogInStatus,
    }
}