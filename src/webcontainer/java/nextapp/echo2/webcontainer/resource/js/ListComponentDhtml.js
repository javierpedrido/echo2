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

//______________________________
// Object EchoListComponentDhtml

EchoListComponentDhtml = function() { };

/**
 * ServerMessage processor.
 */
EchoListComponentDhtml.MessageProcessor = function() { };

/**
 * ServerMessage process() implementation.
 */
EchoListComponentDhtml.MessageProcessor.process = function(messagePartElement) {
    for (var i = 0; i < messagePartElement.childNodes.length; ++i) {
        if (messagePartElement.childNodes[i].nodeType == 1) {
            switch (messagePartElement.childNodes[i].tagName) {
            case "init":
                EchoListComponentDhtml.MessageProcessor.processInit(messagePartElement.childNodes[i]);
                break;
            case "dispose":
                EchoListComponentDhtml.MessageProcessor.processDispose(messagePartElement.childNodes[i]);
                break;
            }
        }
    }
};

EchoListComponentDhtml.MessageProcessor.processDispose = function(disposeMessageElement) {
    for (var item = disposeMessageElement.firstChild; item; item = item.nextSibling) {
        var elementId = item.getAttribute("eid");
	    var selectElement = document.getElementById(elementId);
	    var itemElements = selectElement.getElementsByTagName("div");
	    for (var i = 0; i < itemElements.length; ++i) {
	        EchoEventProcessor.removeHandler(itemElements[i].id, "click");
	        EchoEventProcessor.removeHandler(itemElements[i].id, "mouseout");
	        EchoEventProcessor.removeHandler(itemElements[i].id, "mouseover");
	    }
    }
};

EchoListComponentDhtml.MessageProcessor.processInit = function(initMessageElement) {
    for (var item = initMessageElement.firstChild; item; item = item.nextSibling) {
        var elementId = item.getAttribute("eid");
        var defaultStyle = item.getAttribute("default-style");
        var rolloverStyle = item.getAttribute("rollover-style");
        var selectionStyle = item.getAttribute("selection-style");
        var selectionMode = item.getAttribute("selection-mode");
        var i;

        if (item.getAttribute("enabled") == "false") {
            EchoDomPropertyStore.setPropertyValue(elementId, "EchoClientEngine.inputDisabled", true);
        }
        if (item.getAttribute("server-notify") == "true") {
            EchoDomPropertyStore.setPropertyValue(elementId, "serverNotify", true);
        }

	    var selectElement = document.getElementById(elementId);
	    var itemElements = selectElement.getElementsByTagName("div");
	    for (i = 0; i < itemElements.length; ++i) {
	        EchoEventProcessor.addHandler(itemElements[i].id, "click", "EchoListComponentDhtml.processSelection");
	        EchoEventProcessor.addHandler(itemElements[i].id, "mouseout", "EchoListComponentDhtml.processRolloverExit");
	        EchoEventProcessor.addHandler(itemElements[i].id, "mouseover", "EchoListComponentDhtml.processRolloverEnter");
	    }
        
        EchoDomPropertyStore.setPropertyValue(elementId, "selectionMode", selectionMode);
        EchoDomPropertyStore.setPropertyValue(elementId, "defaultStyle", defaultStyle);
        EchoDomPropertyStore.setPropertyValue(elementId, "rolloverStyle", rolloverStyle);
        EchoDomPropertyStore.setPropertyValue(elementId, "selectionStyle", selectionStyle);

        var selectionItems = item.getElementsByTagName("selection-item");
        for (i = 0; i < selectionItems.length; ++i) {
            var itemId = selectionItems[i].getAttribute("item-id");
            EchoListComponentDhtml.setSelected(document.getElementById(itemId), true);
        }
    }
};

EchoListComponentDhtml.drawItemStyle = function(itemDivElement) {
    var selected = EchoListComponentDhtml.isSelected(itemDivElement);
    var listComponent = itemDivElement.parentNode;
    var selectionStyle = EchoDomPropertyStore.getPropertyValue(listComponent.id, "selectionStyle");

    if (selected) {
        EchoCssUtil.restoreOriginalStyle(itemDivElement);
        EchoCssUtil.applyTemporaryStyle(itemDivElement, selectionStyle);
    } else {
        EchoCssUtil.restoreOriginalStyle(itemDivElement);
    }
};

EchoListComponentDhtml.isSelected = function(itemDivElement) {
    return EchoDomPropertyStore.getPropertyValue(itemDivElement.id, "selectionState") === true;
};

EchoListComponentDhtml.processRolloverEnter = function(echoEvent) {
    var itemElement = echoEvent.registeredTarget;
    var componentId = EchoDomUtil.getComponentId(itemElement.id);
    if (!EchoClientEngine.verifyInput(componentId)) {
        return;
    }
    
    if (!EchoDomPropertyStore.getPropertyValue(itemElement.id, "selectionState")) {
        var rolloverStyle = EchoDomPropertyStore.getPropertyValue(componentId, "rolloverStyle");
        if (rolloverStyle) {
            EchoCssUtil.applyTemporaryStyle(itemElement, rolloverStyle);
        }
    }
};

EchoListComponentDhtml.processRolloverExit = function(echoEvent) {
    var itemElement = echoEvent.registeredTarget;
    if (!EchoDomPropertyStore.getPropertyValue(itemElement.id, "selectionState")) {
        EchoListComponentDhtml.drawItemStyle(itemElement);
    }
};

EchoListComponentDhtml.processSelection = function(echoEvent) {
    EchoDomUtil.preventEventDefault(echoEvent);
    var itemElement = echoEvent.registeredTarget;
    var listElement = itemElement.parentNode;
    var componentId = EchoDomUtil.getComponentId(itemElement.id);
  
//BUGBUG. implement ctrl-key based selection.    
    
    if (!EchoClientEngine.verifyInput(componentId)) {
        return;
    }

    if (document.selection && document.selection.empty) {
        // Clear Internet Explorer Selection
        document.selection.empty();
    }

    if (EchoDomPropertyStore.getPropertyValue(componentId, "selectionMode") != "multiple") {
	    var itemElements = listElement.getElementsByTagName("div");
	    for (var i = 0; i < itemElements.length; ++i) {
	        EchoListComponentDhtml.setSelected(itemElements[i], false);
	    }
    }

    EchoListComponentDhtml.setSelected(itemElement, !EchoListComponentDhtml.isSelected(itemElement));
    EchoListComponentDhtml.updateClientMessage(listElement);
};

/**
 * Sets the selection state of an item.
 *
 * @param itemElement the item DIV element
 * @param newValue the new selection state (a boolean value)
 */
EchoListComponentDhtml.setSelected = function(itemElement, newValue) {

    // Set state flag.
    EchoDomPropertyStore.setPropertyValue(itemElement.id, "selectionState", newValue);
    
    // Redraw.
    EchoListComponentDhtml.drawItemStyle(itemElement);
};

EchoListComponentDhtml.updateClientMessage = function(listElement) {
    var propertyElement  = EchoClientMessage.createPropertyElement(listElement.id, "selection");

    // remove previous values
    while(propertyElement.hasChildNodes()){
        var removed = propertyElement.removeChild(propertyElement.firstChild);
    }

    var itemDivElements = listElement.getElementsByTagName("div");

    // add new values        
    for (var i = 0; i < itemDivElements.length; ++i){
        if (EchoDomPropertyStore.getPropertyValue(itemDivElements[i].id, "selectionState")) {
            var itemId = itemDivElements[i].id;
            var itemElement = EchoClientMessage.messageDocument.createElement("item");
            itemElement.setAttribute("id", itemId);
            propertyElement.appendChild(itemElement);
        }
    }

    if (EchoDomPropertyStore.getPropertyValue(listElement.id, "serverNotify")) {
        EchoClientMessage.setActionValue(listElement.id, "action");
        EchoServerTransaction.connect();
    }

    EchoDebugManager.updateClientMessage();
};
