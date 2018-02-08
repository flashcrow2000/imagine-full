#!/bin/bash

## Do replace of
#
# %%___IMAGINE_APIURL___%% for $IMAGINE_API_URL
# %%___IMAGINE_PAGEURL___%% for $IMAGINE_PAGE_URL
#
# In files where it can be found.

FILES = `grep -l '%%___IMAGINE_APIURL___%%' /usr/html/dist/* /usr/html/dist-server* `

if [ ! -z "$FILES"];
then
    replace %%___IMAGINE_APIURL___%% $IMAGINE_API_URL $FILES
    replace %%___IMAGINE_PAGEURL___%% $IMAGINE_PAGE_URL $FILES
fi

node server.js