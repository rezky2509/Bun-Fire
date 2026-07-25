// Utilizing auth type
import { auth } from "../utils/auth"

export type HonoEnv = {
    Variables:{
        user: typeof auth.$Infer.Session.user | null,
        session: typeof auth.$Infer.Session.session | null
    }
}

// All your Type Definition Go here