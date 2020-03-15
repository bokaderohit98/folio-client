import React from 'react';
import { Avatar, Chip } from '@material-ui/core';
import styled from 'styled-components';
import avatar from '../../assets/avatarFemale.png';
import logos from '../../constants/logos';
import { capitalize } from '../../utils/string';
import { getAge } from '../../utils/date';

const Container = styled.div`
    padding: 16px;
    color: ${props => props.theme.palette.text.primary};
    display: flex;
    flex-direction: column;
    align-items: center;

    .MuiAvatar-root {
        width: 200px;
        height: 200px;
        background: ${props => props.theme.palette.text.primary};
    }
`;

const Name = styled.p`
    margin-top: 24px;
    font-size: 36px;
    font-weight: 500;
`;

const HandlesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 0;
`;

const Handle = styled.div`
    font-size: 14px;
    margin: 4px 0;
    display: flex;
    align-items: center;

    .MuiAvatar-root {
        background: transparent;
        height: 28px;
        width: 28px;
        margin-right: 12px;
    }
`;

const Chips = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 0 16px;
    margin-bottom: 16px;

    .MuiChip-root {
        padding: 0 12px;
    }

    .MuiChip-root:first-child {
        margin-right: 16px;
    }
`;

const Info = ({ data }) => {
    const { name, social_handles: socialHandles, gender, dob } = data;
    return (
        <Container>
            <Avatar src={avatar} />
            <Name>{capitalize(name)}</Name>
            <Chips>
                <Chip label={capitalize(gender)} color="primary" />
                <Chip label={`${getAge(dob)} Years`} color="primary" />
            </Chips>
            <HandlesContainer>
                {socialHandles.map(({ type, handle }, index) => (
                    <Handle key={type + handle + index}>
                        <Avatar src={logos(type)} variant="square" />
                        {`@${handle}`}
                    </Handle>
                ))}
            </HandlesContainer>
        </Container>
    );
};

export default Info;
