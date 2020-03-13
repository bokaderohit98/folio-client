import React from 'react';
import styled from 'styled-components';
import Primary from './Primary';
import Secondary from './Secondary';

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    position: relative;

    .SecondaryRight {
        transform: translateX(0);
    }

    .SecondaryLeft {
        transform: translateX(-100%);
    }

    .PrimaryLeft {
        transform: translateX(0);
    }

    .PrimaryRight {
        transform: translateX(100%);
    }
`;

const PrimaryContainer = styled.div`
    display: flex;
    width: 50%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const SecondaryContainer = styled.div`
    display: flex;
    width: 50%;
    height: 100vh;
    transition: 0.3s all;

    .Left {
        -webkit-box-ordinal-group: 1;
        -moz-box-ordinal-group: 1;
        -ms-flex-order: 1;
        -webkit-order: 1;
        order: 1;
    }

    .Right {
        -webkit-box-ordinal-group: 2;
        -moz-box-ordinal-group: 2;
        -ms-flex-order: 2;
        -webkit-order: 2;
        order: 2;
    }

    .LeftBorder {
        border-width: 100vh 0 0 100px;
        border-color: #1144e8 transparent transparent transparent;
    }

    .RightBorder {
        border-width: 0 100px 100vh 0;
        border-color: transparent transparent #1144e8 transparent;
    }
`;

const SecondaryContent = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #1144e8;
    box-shadow: 1px 1px #1144e8;
`;

const SecondaryBorder = styled.div`
    border-style: solid;
`;

class Authentication extends React.Component {
    state = {
        mode: 'login',
        subMode: 'viaPassword',
        data: {
            register: {
                name: '',
                email: '',
                password: '',
                gender: '',
                dob: ''
            },
            loginViaPassword: {
                email: '',
                password: ''
            },
            loginViaOtp: {
                email: '',
                otp: ''
            }
        }
    };

    handleToggleMode = () => {
        const { mode } = this.state;
        this.setState({
            mode: mode === 'login' ? 'register' : 'login'
        });
    };

    handleToggleSubMode = () => {
        const { subMode } = this.state;
        this.setState({
            subMode: subMode === 'viaPassword' ? 'viaOTP' : 'viaPassword'
        });
    };

    handleChange = entity => (type, attribute) => event => {
        const { data } = this.state;
        const updatedData = { ...data };

        if (type === 'string')
            updatedData[entity][attribute] = event.target.value;
        else if (type === 'date')
            updatedData[entity][attribute] = event.valueOf();
        else if (type === 'select')
            updatedData[entity][attribute] = event.target.value;
        this.setState({ data: updatedData });
        console.log(updatedData);
    };

    handleGetOtp = () => {
        console.log('Getting Otp');
    };

    handleSubmit = type => () => {
        console.log(this.state.data[type]);
    };

    getClasses = () => {
        const { mode } = this.state;
        if (mode === 'login')
            return [
                'PrimaryLeft',
                'SecondaryRight',
                'Right',
                'Left',
                'LeftBorder'
            ];
        return [
            'PrimaryRight',
            'SecondaryLeft',
            'Left',
            'Right',
            'RightBorder'
        ];
    };

    render() {
        const [
            primaryClass,
            secondaryClass,
            secondaryContentClass,
            secondaryBorderPositionClass,
            secondaryBorderStyleClass
        ] = this.getClasses();

        const { mode, subMode, data } = this.state;

        return (
            <Container>
                <PrimaryContainer className={primaryClass}>
                    <Primary
                        mode={mode}
                        subMode={subMode}
                        data={data}
                        onToggleSubMode={this.handleToggleSubMode}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        onGetOtp={this.handleGetOtp}
                    />
                </PrimaryContainer>
                <SecondaryContainer className={secondaryClass}>
                    <SecondaryContent className={secondaryContentClass}>
                        <Secondary
                            mode={mode}
                            onToggleMode={this.handleToggleMode}
                        />
                    </SecondaryContent>
                    <SecondaryBorder
                        className={[
                            secondaryBorderPositionClass,
                            secondaryBorderStyleClass
                        ].join(' ')}
                    />
                </SecondaryContainer>
            </Container>
        );
    }
}

export default Authentication;
