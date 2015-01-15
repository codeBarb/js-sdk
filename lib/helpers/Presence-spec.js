/**
 * @description RingPlatform JS SDK
 * @copyright © 2014-2015 RingCentral, Inc. All rights reserved.
 */
describe('RCSDK.helpers.Presence', function() {

    'use strict';

    var Presence = rcsdk.getPresenceHelper();
    var Call = rcsdk.getCallHelper();

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(Presence.createUrl()).to.equal('/account/~/extension/~/presence');
            expect(Presence.createUrl({}, 'foo')).to.equal('/account/~/extension/foo/presence');
            expect(Presence.createUrl({detailed: true}, 'foo')).to.equal('/account/~/extension/foo/presence?detailedTelephonyState=true');

        });

    });

    describe('attachToExtensions', function() {

        it('attaches presence to all matching extensions', function() {

            var presences = [
                    {extension: {id: 'foo'}, presenceStatus: 'Offline'},
                    {extension: {id: 'bar'}, presenceStatus: 'Busy'},
                    {extension: {id: 'baz'}, presenceStatus: 'Available'}
                ],
                extensions = [
                    {id: 'foo'},
                    {id: 'bar'},
                    {id: 'baz'},
                    {id: 'qux'}
                ];

            Presence.attachToExtensions(extensions, presences);

            expect(extensions[0].presence).to.equal(presences[0]);
            expect(extensions[1].presence).to.equal(presences[1]);
            expect(extensions[2].presence).to.equal(presences[2]);
            expect(extensions[3].presence).to.be.an('undefined');

        });

    });

    describe('getSubscription', function() {

        it('returns pre-configured Subscription object', function() {

            var notificaction = Presence.getSubscription({detailed: true}, 'foo');

            expect(notificaction.eventFilters.length).to.equal(1);
            expect(notificaction.eventFilters[0]).to.equal('/account/~/extension/foo/presence?detailedTelephonyState=true');

        });

    });

    describe('updateSubscription', function() {

        it('adds proper events to Subscription object', function() {

            var notificaction = rcsdk.getSubscription();

            expect(notificaction.eventFilters.length).to.equal(0);

            Presence.updateSubscription(notificaction, [{extension: {id: 'foo'}}, {extension: {id: 'bar'}}], {detailed: true});

            expect(notificaction.eventFilters.length).to.equal(2);
            expect(notificaction.eventFilters[0]).to.equal('/account/~/extension/foo/presence?detailedTelephonyState=true');
            expect(notificaction.eventFilters[1]).to.equal('/account/~/extension/bar/presence?detailedTelephonyState=true');

        });

    });


});