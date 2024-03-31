import { Show, type Component } from "solid-js";
import { useAuthContext } from "./AuthProvider";

const LoginForm: Component = () => {
    const authCtx = useAuthContext();
    function handleLogin(e: SubmitEvent) {
        e.preventDefault();
        // @ts-expect-error
        const login = e.currentTarget.login.value;
        // @ts-expect-error
        const password = e.currentTarget.password.value;
        console.log(login, password);

        if (login === "admin" && password === "42069") {
            authCtx.setsignin(true);
        } else {
            alert("Where are you going hackerman?");
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <input type="text" name="login" />
            <input type="password" name="password" />
            <input type="submit" value="Log in!" />
        </form>
    );
};

const SecureApp: Component = () => {
    return <div>Supa secret stuff</div>;
};

const App: Component = () => {
    const authCtx = useAuthContext();
    return (
        <>
            <nav>
                <h1>My app</h1>
                <Show when={authCtx.signin()}>
                    <button onClick={() => authCtx.setsignin(false)}>
                        Log out
                    </button>
                </Show>
            </nav>
            <main>
                <Show when={!authCtx.signin()} fallback={<SecureApp />}>
                    <LoginForm />
                </Show>
            </main>
        </>
    );
};

export default App;
