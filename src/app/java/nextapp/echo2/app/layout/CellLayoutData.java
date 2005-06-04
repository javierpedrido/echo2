/* 
 * This file is part of the Echo Web Application Framework (hereinafter "Echo").
 * Copyright (C) 2002-2005 NextApp, Inc.
 *
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 */

package nextapp.echo2.app.layout;

import nextapp.echo2.app.Alignment;
import nextapp.echo2.app.Color;
import nextapp.echo2.app.Insets;
import nextapp.echo2.app.LayoutData;

/**
 * An abstract base layout data object for components which render their
 * children in cells.
 */
public abstract class CellLayoutData 
implements LayoutData {
    
    private Color background;
    private Insets insets;
    private boolean lineWrap = true;
    private Alignment alignment;
    
    /**
     * Returns the alignment of the cell.
     * 
     * @return the alignment
     */
    public Alignment getAlignment() {
        return alignment;
    }
    
    /**
     * Returns the background color of the cell.
     * 
     * @return the background color
     */
    public Color getBackground() {
        return background;
    }
    
    /**
     * Returns the inset margins of the cell.
     * 
     * @return the inset margins
     */
    public Insets getInsets() {
        return insets;
    }
    
    /**
     * Determines whether line wrapping is enabled on the cell.
     * 
     * @return true if line wrapping is enabled
     */
    public boolean isLineWrap() {
        return lineWrap;
    }
    
    /**
     * Sets the alignment of the cell.
     * 
     * @param newValue the new alignment
     */
    public void setAlignment(Alignment newValue) {
        alignment = newValue;
    }
    
    /**
     * Sets the background color of the cell.
     * 
     * @param newValue the new background color
     */
    public void setBackground(Color newValue) {
        background = newValue;
    }
    
    /**
     * Sets the inset margins of the cell.
     * 
     * @param newValue the inset margins
     */
    public void setInsets(Insets newValue) {
        insets = newValue;
    }
    
    /**
     * Sets whether line wrapping is enabled on the cell.
     * 
     * @param newValue ture to enable line wrapping
     */
    public void setLineWrap(boolean newValue) {
        lineWrap = newValue;
    }
}
