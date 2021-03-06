import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@redhat-cloud-services/frontend-components';
import {
    Breadcrumb,
    BreadcrumbItem,
    Stack,
    StackItem,
    Split,
    SplitItem
} from '@patternfly/react-core';

import PropTypes from 'prop-types';

export class NotificationsPage extends Component {
    toIndex = (event) => {
        event.preventDefault();
        this.props.history.push('/list');
    }

    showRootLink = () =>
        this.props.history && this.props.history.location.pathname !== '/list' ?
            <BreadcrumbItem to='#' onClick={ this.toIndex }>Hooks</BreadcrumbItem>
            : '';

    showBreadcrumb = () =>
        this.props.showBreadcrumb && <Breadcrumb style={ { marginLeft: 'calc(var(--pf-c-content--ol--MarginLeft) * -1 * 2)' } }>
            { this.showRootLink() }
            <BreadcrumbItem isActive style={ { marginTop: 0 } }>{ this.props.title }</BreadcrumbItem>
        </Breadcrumb>

    render() {
        const { title, children, appendix, rightHeader } = this.props;

        return (
            <Fragment>
                <PageHeader>
                    { this.showBreadcrumb() }
                    <Split>
                        <SplitItem isFilled={ true }><PageHeaderTitle title={ title } /></SplitItem>
                        <SplitItem>{ rightHeader }</SplitItem>
                    </Split>
                </PageHeader>
                <Stack style={ { backgroundColor: 'var(--pf-c-page__main-section--BackgroundColor)' } }>
                    <StackItem>
                        <Main style={ this.props.mainStyle }>
                            { children }
                        </Main>
                    </StackItem>
                    { appendix &&
                      <StackItem>
                          { appendix }
                      </StackItem> }
                </Stack>
            </Fragment>
        );
    }
};

NotificationsPage.defaultProps = {
    showBreadcrumb: true,
    rightHeader: null
};

NotificationsPage.propTypes = {
    title: PropTypes.string.isRequired,
    rightBar: PropTypes.node,
    showBreadcrumb: PropTypes.bool,
    children: PropTypes.node,
    history: PropTypes.object,
    mainStyle: PropTypes.object,
    appendix: PropTypes.node,
    rightHeader: PropTypes.node
};

export default withRouter(NotificationsPage);
