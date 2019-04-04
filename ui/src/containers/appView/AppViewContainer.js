import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Title } from '@patternfly/react-core';
import AppOverview from '../../components/appView/AppOverview';
import Content from '../../components/common/Content';
import AppToolbar from '../../components/appView/AppToolbar';
import HeaderContainer from '../HeaderContainer';
import AppVersionsTableContainer from './AppVersionsTableContainer';
import DisableAppModalContainer from './DisableAppModalContainer';
import NavigationModalContainer from './NavigationModalContainer';
import SaveAppModalContainer from './SaveAppModalContainer';
import { getAppById, toggleNavigationModal, toggleSaveAppModal, toggleDisableAppModal, setAppDetailedIsDirty } from '../../actions/actions-ui';

class AppViewContainer extends React.Component {
  componentWillMount () {
    this.props.getAppById(this.props.match.params.id);

    this.props.setAppDetailedIsDirty(this.isAppVersionsDirty());

    this.unblockHistory = this.props.history.block(targetLocation => {
      // If the view has a dirty state, display the popup
      if (this.props.isDirty) {
        this.props.toggleNavigationModal(true, targetLocation.pathname);
        return false;
      }
    });
  }

  componentDidUpdate () {
    this.props.setAppDetailedIsDirty(this.isAppVersionsDirty());
  }

  componentWillUnmount () {
    this.unblockHistory();
  }

  onConfirmSaveApp () {
    this.props.toggleSaveAppModal();
    // TODO: Make a PUT request to API
    // to update the App versions
  }

  isAppVersionsDirty () {
    const currentVersions = this.props.app.deployedVersions;
    const savedVersions = this.props.savedData.deployedVersions;

    var isDirty = false;

    for (var i = 0; i < currentVersions.length; i++) {
      var currentVersionValues = Object.values(currentVersions[ i ]).toString();
      var savedVersionValues = Object.values(savedVersions[ i ]).toString();

      if (currentVersionValues !== savedVersionValues) {
        isDirty = true;
        break;
      }
    }

    return isDirty;
  };

  render () {
    return (
      <div className="app-detailed-view">
        <HeaderContainer />
        <AppToolbar app={this.props.app} onSaveAppClick={this.props.toggleSaveAppModal} onDisableAppClick={this.props.toggleDisableAppModal} isViewDirty={this.props.isDirty}/>
        <Content className="container">
          <AppOverview app={this.props.app} className='app-overview' />
          <Title className="table-title" size="2xl">
            Deployed Versions
          </Title>
          <AppVersionsTableContainer className='table-scroll-x' />
          <NavigationModalContainer title="Are you sure you want to leave this page?" unblockHistory={this.unblockHistory}>
            You still have unsaved changes.
          </NavigationModalContainer>
          <SaveAppModalContainer title="Save Changes" onConfirm={() => this.onConfirmSaveApp()}>
            Are you sure you want to save your changes to this app?
          </SaveAppModalContainer>
          <DisableAppModalContainer />
        </Content>
      </div>
    );
  }
}

AppViewContainer.propTypes = {
  app: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string,
      appId: PropTypes.string,
      appName: PropTypes.string,
      deployedVersions: PropTypes.arrayOf(PropTypes.object)
    })
  }),
  isDirty: PropTypes.bool,
  getAppById: PropTypes.func.isRequired,
  toggleNavigationModal: PropTypes.func.isRequired,
  toggleSaveAppModal: PropTypes.func.isRequired,
  toggleDisableAppModal: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  return {
    app: state.app.data,
    savedData: state.app.savedData,
    isDirty: state.app.isDirty
  };
};

const mapDispatchToProps = {
  getAppById,
  toggleNavigationModal,
  toggleSaveAppModal,
  toggleDisableAppModal,
  setAppDetailedIsDirty
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppViewContainer));