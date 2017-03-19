/**
 * Created by uzysjung on 2016. 10. 20..
 */
import React from 'react';
import PageWrapper from '../../components/page/PageWrapper'
import PageHeader from '../../components/page/PageHeader'
import PageContent from '../../components/page/PageContent'
import Box from '../../components/widget/Box'
import Pkg from '../../../../package.json'

export default function HomePage() {
    return (
        <PageWrapper>
            <PageHeader
                title="Weapon Management Depo System "
                description="(WMDs)"
            >
            </PageHeader>
            <PageContent>
                <Box
                    title="Welcome to WMDs"
                    status="primary"
                    expandable
                    removable
                >
                    TODO add something here
                </Box>


            </PageContent>
        </PageWrapper>
    );
}
