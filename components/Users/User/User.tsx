import React, {useState} from "react";
import styles from './User.module.css';
import cn from 'classnames/bind';
import Link from "next/link";

interface UserProps {
    username: string,
    created_at: Date,
    exp: string | null,
    accountType: string,
    email: string,
    gdc_number: string,
    auth_time: string | null,
    subscription_id: string | null,
    onSuspendUserClick: ({ email: string }) => void;
    onDeleteUserClick: ({ email: string }) => void;
}

const cx = cn.bind(styles);

export const User: React.FC<UserProps> = (props: UserProps) => {
    const [opened, setOpened] = useState(false);

    const creationDate = props.created_at?.toString().split('/').reverse().join('/');

    const theme = cx({
        default: !opened,
        green: opened
    });

    const visibility = cx({
        hidden: !opened,
        visible: opened
    });

    const svgColor = cx({
        svg_white: opened
    });

    const onSuspendUserClick = () => {
        props.onSuspendUserClick({
            email: props.email
        })
    };

    const onDeleteUserClick = () => {
        props.onDeleteUserClick({
            email: props.email
        })
    };

    return(
        <li className={cn(styles.userItem, theme)}>
            <section className={cn(styles.user, theme)}>
                <span className={cn(styles.text, theme)}>{props.username}</span>
                <span className={cn(styles.text, theme)}>{creationDate}</span>
                { props.accountType === "premium" &&
                <span className={cn(styles.text, theme)}>
                    Paid Subscription Ends: {props.exp}
                </span>
                }
                { props.accountType === "free" &&
                <span className={cn(styles.text, theme)}>
                    Account is free
                </span>
                }

                  <a className={cn(styles.link, styles.text, theme)}>
                    <img className={svgColor} src="../images/user.svg"/>
                    <span>View Profile</span>
                  </a>

                <button
                    className={cn(styles.link, styles.openBtn, theme)}
                    onClick={() => { setOpened(!opened) }}
                >
                    { !opened &&
                    <img className={cn(styles.openBtn_img, svgColor)} src="../images/plus.svg"/>
                    }
                    { opened &&
                    <img className={cn(styles.openBtn_img, svgColor)} src="../images/minus.svg"/>
                    }

                </button>
            </section>
            <section className={cn(styles.userDetails, visibility, theme)}>
                <div className={styles.userInfo}>
                    <span className={styles.key}>Account Email:</span>
                    <span className={styles.value}>{props.email}</span>
                </div>
                <div className={styles.userInfo}>
                    <span className={styles.key}>GDC Number:</span>
                    <span className={styles.value}>{props.gdc_number}</span>
                </div>
                <div className={styles.userInfo}>
                    <span className={styles.key}>Post Code:</span>
                    <span className={styles.value}>Post Code</span>
                </div>
                <div className={styles.userInfo}>
                    <span className={styles.key}>Last Logged In:</span>
                    <span className={styles.value}>{props.auth_time}</span>
                </div>
                <div className={styles.userInfo}>
                    <span className={styles.key}>Subscription #:</span>
                    <span className={styles.value}>{props.subscription_id}</span>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.btnWrap}>
                        <button type='button'
                                className={styles.suspendDeleteBtn}
                                onClick={onSuspendUserClick}>
                            Suspend
                        </button>
                    </div>
                    <div className={styles.btnWrap}>
                        <button type='button'
                                className={styles.suspendDeleteBtn}
                                onClick={onDeleteUserClick}
                        >
                            Delete
                        </button>
                </div>
                </div>
            </section>
        </li>
    );
};
