import axios from 'axios';

const authFedex = async () => {
    try {
        const inputPayload = {
            grant_type: 'client_credentials',
            client_id: process.env.FEDEX_API_KEY,
            client_secret: process.env.FEDEX_SECRET_KEY
        };
        // Headers
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const response = await axios.post(`${process.env.FEDEX_BASE_API_URL}/oauth/token`, inputPayload, { headers: headers });
        return response.data;
    } catch (error) {
        console.error('Error authenticating with FedEx API:', error);
        throw new Error('Failed to authenticate with FedEx API');
    }
};

class FedexTrackingController {
    static trackFedexShipment = async (req, res) => {
        try {
            const authRes = await authFedex();
            const { trackingNo } = req.body
            const inputPayload = {
                includeDetailedScans: true,
                trackingInfo: [
                    {
                        trackingNumberInfo: {
                            trackingNumber: trackingNo
                        }
                    }
                ]
            };

            const headers = {
                'Content-Type': 'application/json',
                'X-locale': 'en_US',
                'Authorization': `Bearer ${authRes.access_token}`
            };

            const response = await axios.post(`${process.env.FEDEX_BASE_API_URL}/track/v1/trackingnumbers`, inputPayload, { headers: headers });

            console.log('FedEx API response:', JSON.stringify(response.data, null, 2)); // Add this line to inspect the structure

            const trackResults = response.data.output.completeTrackResults?.[0]?.trackResults?.[0]?.scanEvents;

            if (!trackResults) {
                throw new Error('Tracking results are not available.');
            }

            const trackingDetails = trackResults.map(item => ({
                eventDescription: item.eventDescription,
                city: item.scanLocation.city
            }));

            res.send(trackingDetails);
        } catch (error) {
            console.error('Error tracking FedEx shipment:', error);
            res.status(500).send('Failed to track FedEx shipment');
        }
    }
}

export default FedexTrackingController;
