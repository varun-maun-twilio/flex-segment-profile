import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import { CustomizationProvider } from "@twilio-paste/core/customization";

import SegmentProfile from './components/SegmentProfile';

const PLUGIN_NAME = 'FlexSegmentProfilePlugin';

export default class FlexSegmentProfilePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {

    flex.setProviders({
      PasteThemeProvider: CustomizationProvider
    });

    flex.AgentDesktopView.defaultProps.showPanel2=false;
    
    flex.AgentDesktopView.Content.add(<SegmentProfile key="FlexSegmentProfilePlugin-component" />, {});
  }
}
