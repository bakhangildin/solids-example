import {
    Accessor,
    ParentComponent,
    Setter,
    createContext,
    createSignal,
    useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

type AuthContext = {
    signin: Accessor<boolean>;
    setsignin: Setter<boolean>;
};

const ctx = createContext<AuthContext>();

export function useAuthContext() {
    const c = useContext(ctx);
    if (!c) {
        throw new Error("use inside AuthProvider");
    }
    return c;
}

const AuthProvider: ParentComponent = (props) => {
    const [signin, setsignin] = createSignal(false);
    const v: AuthContext = {
        signin: signin,
        setsignin: setsignin,
    };
    return <ctx.Provider value={v}>{props.children}</ctx.Provider>;
};

export default AuthProvider;
