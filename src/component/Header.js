import React from 'react';
import { Component } from 'react';
import {
    Stack,
    Badge,
    Avatar,
    IconButton,
    Button
} from 'rsuite';
import NoticeIcon from '@rsuite/icons/Notice';
import GearIcon from '@rsuite/icons/Gear';
import GithubIcon from '@rsuite/icons/legacy/Github';
import HeartIcon from '@rsuite/icons/legacy/HeartO';
//侧边栏右侧内容页的header 右侧的头像设置，github标志等
//在js内更改css，只作用于当前组件
const Stack1 = {
    position: "absolute",
    right: "30px",
    top: "20px",
    cursor: "pointer",
    zIndex: "1",
};

class Header extends Component {
    //   const trigger = useRef<Whisper>(null);
    render() {
        return (
            <Stack className="header" spacing={8} style={Stack1}>
                <IconButton
                    icon={<HeartIcon style={{ fontSize: 20 }} color="red" />}
                    href="https://opencollective.com/rsuite"
                    target="_blank"
                />
                <IconButton
                    icon={<GithubIcon style={{ fontSize: 20 }} />}
                    href="https://github.com/rsuite/rsuite-admin-template"
                    target="_blank"
                />

                <IconButton
                    icon={
                        <Badge content={5}>
                            <NoticeIcon style={{ fontSize: 20 }} />
                        </Badge>
                    }
                />

                <IconButton icon={<GearIcon style={{ fontSize: 20 }} />} />

                {/* 头像 */}
                <Avatar
                    size="sm"
                    circle
                    src="https://avatars.githubusercontent.com/u/1203827"
                    alt="@simonguo"
                    style={{ marginLeft: 8 }}
                />

                <Button color="cyan" appearance="subtle">
                    Sign out
                </Button>
            </Stack>
        );
    };
}

export default Header;