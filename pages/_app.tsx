import * as React from 'react';
import {useState} from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@material-ui/core/styles';
import {CacheProvider} from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Global from '@material-ui/core/GlobalStyles'
import createCache from '@emotion/cache';
import createTheme from '../src/theme';
import {Button} from '@material-ui/core';

export const cache = createCache({key: 'css', prepend: true});

export default function MyApp(props: AppProps) {
    const {Component, pageProps} = props;
    const [darkmode, setDarkMode] = useState(false)
    const theme = createTheme(darkmode)
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <CacheProvider value={cache}>
            <Head>
                <title>My page</title>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <Global
                    styles={(currTheme) => ({
                        html: {
                            backgroundColor: currTheme.palette.background.paper
                        }
                    })}
                />
                <Component {...pageProps} />
                <Button onClick={() => setDarkMode(prevState => !prevState)}>switch
                    to {darkmode ? 'light' : 'dark'} mode!</Button>
            </ThemeProvider>
        </CacheProvider>
    );
}
