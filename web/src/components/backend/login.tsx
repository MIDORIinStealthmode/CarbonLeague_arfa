import { useState } from "react";
import styles from "./Home.module.css";
import { connectToSmartWallet } from "./wallet";
import { Button } from "../ui/button";


type LoginProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signer , setSigner] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    const connectWallet = async () => {
        if (!username || !password) return;
        try {
          setIsLoading(true);
          const wallet = await connectToSmartWallet(username, password, (status) =>
            setLoadingStatus(status)
          );
          const s = await wallet.getSigner();
          setSigner(s);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          console.error(e);
          setError((e as any).message);
        }
      };

    return username && signer ? (
        <>
           <p>Connected</p>
        </>
    ) : isLoading ? (
        <div className={styles.card}>
            <div
                style={{
                    width: "440px",
                }}
            >
                {/* <LottieLoader animationData={loadingLottie}/> */}
            </div>
            <p>{loadingStatus}</p>
        </div>
    ) : error ? (
        <div>
            <p>Error</p>
        <button onClick={() => setError('')}>
            Try again
        </button>
        </div>
    ) : (
        <div
            className={`${styles.loginContainer} ${isOpen ? styles.open : ''}`}
            onClick={handleOutsideClick}
        >
                <div
                    className={`${styles.loginCard} ${isOpen ? styles.open : ''}`}
                >
                    <h1>Login with Username & Password</h1>
                    <div className={styles.loginInput}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            onClick={() => connectWallet()}
                            >
                                Login
                            </Button>
                    </div>
                    <button
                    onClick={onClose}
                    className={styles.closeButton}
                    >close</button>
                </div>
        </div>
    );
};


