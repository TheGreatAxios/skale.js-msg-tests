import { MultisigWallet } from "@skaleproject/multisig-wallet";
import styles from "../../styles/Owners.module.css";

type Props = {
    update: () => Promise<void>;
    owners: string[];
    msg: MultisigWallet;
}

export default function Owners({ owners, msg, update }: Props) {
    return (
        <div className={styles.owners}>
            {owners && owners.map((owner: string, index: number) => {
                return (
                    <div className={styles.owner} key={index}>
                        <p>{owner}</p>
                        <button onClick={async(e) => {
                            e.preventDefault();
                            await msg.removeOwner({
                                address: owner
                            });
                            setTimeout(async() => {
                                await update();
                            }, 2500);
                        }}>Remove Owner</button>
                    </div>
                );
            })}
        </div>
    );
}