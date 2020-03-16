import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Loading } from '../../components';

import Info from './Info';
import Entity from './Entity';
import { getUser } from '../../redux/actions';

const Container = styled.div`
    background: ${props => props.theme.palette.background.paper};
    display: flex;
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

class Home extends React.Component {
    componentDidMount() {
        const { getUser } = this.props;
        getUser();
    }

    render() {
        const {
            user,
            education,
            work,
            achivement,
            loading,
            error
        } = this.props;

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
