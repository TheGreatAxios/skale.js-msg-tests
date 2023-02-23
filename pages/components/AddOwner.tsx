import { MultisigWallet } from "@skaleproject/multisig-wallet";
import { isAddress } from "ethers/lib/utils.js";
import { useState } from "react";
import styles from "../../styles/AddOwner.module.css";

type Props = {
    update: () => Promise<void>
    owners: string[];
    msg: MultisigWallet;
}

export default function AddOwner({ update, owners, msg }: Props) {

    const [address, setAddress] = useState<string>("");

    return (
        <div className={styles.owners}>
            <form>
                <input type="text" onChange={(e) => {
                    e.preventDefault();
                    setAddress(e.target.value);
                }} value={address} />
                <button onClick={async(e) => {
                    e.preventDefault();
                    try {
                        if (isAddress(address) && !owners.includes(address)) {
                            await msg.addOwner({
                                address
                            });
                        }
                    } catch (err) {
                        alert(err);
                    } finally {
                        update();
                    }
                    
                }}>
                    {isAddress(address) && !owners.includes(address) && "Add Owner"}
                    {isAddress(address) && owners.includes(address) && address + " is an owner"}
                    {!isAddress(address) && "Invalid Eth Address"}
                </button>
            </form>
        </div>
    );
}