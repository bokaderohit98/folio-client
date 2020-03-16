import React from 'react';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { Loading } from '../../components';
import api from '../../api';
import Info from './Info';
import Entity from './Entity';
import { getUser } from '../../redux/actions';

const Container = styled.div`
    background: ${props => props.theme.palette.background.paper};
    display: flex;
    flex-direction: column;
    align-items: center;

    .InfoGrid {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const EntityContainer = styled(Grid)`
    position: relative;
    padding: 56px 40px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: auto;
`;

const UnverifiedBanner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.palette.error.main};
    color: ${props => props.theme.palette.common.white};
    padding: 16px;
    margin-bottom: 40px;
    border-radius: 2px;

    p {
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 16px;
    }

    .MuiButton-root {
        width: 140px;
        height: 36px;
    }

    .Message {
        font-size: 14px;
        margin-top: 12px;
        margin-bottom: 0;
    }
`;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationEmailLoading: false,
            verificationEmailSuccess: false
        };
    }

    componentDidMount() {
        const { getUser } = this.props;
        getUser();
    }

    handleResendVerificationEmail = () => {
        this.setState({ verificationEmailLoading: true });
        api.resendVerificationEmail(
            () => {
                this.setState({
                    verificationEmailLoading: false,
                    verificationEmailSuccess: true
                });
            },
            () => {
                this.setState({
                    verificationEmailLoading: false
                });
            }
        );
    };

    render() {
        const {
            user,
            education,
            work,
            achivement,
            loading,
            error
        } = this.props;

        const {
            verificationEmailLoading,
            verificationEmailSuccess
        } = this.state;

        return (
            <>
                {loading && <Loading />}
                {!loading && !error && (
                    <Container>
                        <Grid container>
                            <Grid item sm={6} className="InfoGrid">
                                <Info data={user} />
                            </Grid>
                            <EntityContainer item sm={6}>
                                {user && !user.verified && (
                                    <UnverifiedBanner>
                                        <p>
                                            Veriify your email address to access
                                            full features!
                                        </p>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={verificationEmailLoading}
                                            onClick={
                                                this
                                                    .handleResendVerificationEmail
                                            }
                                        >
                                            {verificationEmailLoading ? (
                                                <ClipLoader
                                                    size={16}
                                                    color="#ffffff"
                                                />
                                            ) : (
                                                'Resend Email'
                                            )}
                                        </Button>
                                        {verificationEmailSuccess && (
                                            <p className="Message">
                                                Verification Email Sent!
                                            </p>
                                        )}
                                    </UnverifiedBanner>
                                )}
                                <Entity label="education" data={education} />
                                <Entity label="work" data={work} />
                                <Entity label="achivement" data={achivement} />
                            </EntityContainer>
                        </Grid>
                    </Container>
                )}
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    education: state.educations,
    work: state.works,
    achivement: state.achivements,
    loading: state.userLoading,
    error: state.userError
});

const mapDispatchToProps = { getUser };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
