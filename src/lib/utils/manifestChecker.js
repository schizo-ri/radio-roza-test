/**
 * DASH Manifest Checker Utility
 * Validates and debugs DASH manifests for streaming issues
 */

export class ManifestChecker {
  constructor(manifestUrl) {
    this.url = manifestUrl;
    this.manifest = null;
    this.issues = [];
    this.warnings = [];
    this.info = {};
  }

  /**
   * Validate the manifest and return detailed results
   */
  async validate() {
    console.log('🔍 Starting manifest validation for:', this.url);

    try {
      // Step 1: Check URL accessibility
      await this.checkAccessibility();

      // Step 2: Fetch and parse manifest
      await this.fetchManifest();

      // Step 3: Parse XML structure
      await this.parseManifest();

      // Step 4: Validate DASH structure
      this.validateDashStructure();

      // Step 5: Check segment availability
      await this.checkSegmentAvailability();

      // Step 6: Validate timing and live stream specifics
      this.validateTimingInfo();
    } catch (error) {
      this.issues.push({
        type: 'fatal',
        message: `Validation failed: ${error.message}`,
        error,
      });
    }

    return this.getReport();
  }

  /**
   * Check if manifest URL is accessible
   */
  async checkAccessibility() {
    try {
      console.log('📡 Checking manifest accessibility...');

      // Try HEAD request first
      try {
        const headResponse = await fetch(this.url, {
          method: 'HEAD',
          mode: 'cors',
          cache: 'no-cache',
        });

        if (!headResponse.ok) {
          throw new Error(`HEAD request failed: ${headResponse.status}`);
        }

        console.log('✅ HEAD request successful');
        this.info.headRequestStatus = headResponse.status;
        this.info.contentType = headResponse.headers.get('content-type');
        this.info.contentLength = headResponse.headers.get('content-length');
        this.info.accessControlHeaders = {
          allowOrigin: headResponse.headers.get('access-control-allow-origin'),
          allowMethods: headResponse.headers.get('access-control-allow-methods'),
          allowHeaders: headResponse.headers.get('access-control-allow-headers'),
        };
      } catch (headError) {
        console.log('ℹ️ HEAD request failed, will try GET:', headError.message);
        this.warnings.push({
          type: 'cors',
          message: 'HEAD request failed, might indicate CORS issues',
        });
      }
    } catch (error) {
      this.issues.push({
        type: 'network',
        message: `Cannot access manifest URL: ${error.message}`,
        url: this.url,
      });
      throw error;
    }
  }

  /**
   * Fetch the manifest content
   */
  async fetchManifest() {
    try {
      console.log('📄 Fetching manifest content...');

      const response = await fetch(this.url, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          Accept: 'application/dash+xml, application/xml, text/xml',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const manifestText = await response.text();
      this.manifest = manifestText;

      console.log('✅ Manifest fetched successfully');
      this.info.manifestSize = manifestText.length;
      this.info.responseStatus = response.status;
      this.info.lastModified = response.headers.get('last-modified');
      this.info.cacheControl = response.headers.get('cache-control');
    } catch (error) {
      this.issues.push({
        type: 'fetch',
        message: `Failed to fetch manifest: ${error.message}`,
        url: this.url,
      });
      throw error;
    }
  }

  /**
   * Parse XML structure
   */
  async parseManifest() {
    try {
      console.log('🔧 Parsing manifest XML...');

      if (!this.manifest) {
        throw new Error('No manifest content to parse');
      }

      // Basic XML validation
      if (!this.manifest.includes('<?xml') && !this.manifest.includes('<MPD')) {
        throw new Error('Content does not appear to be XML/MPD format');
      }

      // Try to parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(this.manifest, 'text/xml');

      // Check for parser errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error(`XML parsing error: ${parserError.textContent}`);
      }

      this.xmlDoc = xmlDoc;
      console.log('✅ XML parsed successfully');
    } catch (error) {
      this.issues.push({
        type: 'parsing',
        message: `Failed to parse manifest XML: ${error.message}`,
        content: this.manifest.substring(0, 200) + '...',
      });
      throw error;
    }
  }

  /**
   * Validate DASH-specific structure
   */
  validateDashStructure() {
    console.log('🎯 Validating DASH structure...');

    try {
      const mpd = this.xmlDoc.querySelector('MPD');
      if (!mpd) {
        this.issues.push({
          type: 'structure',
          message: 'Missing root MPD element',
        });
        return;
      }

      // Extract MPD attributes
      this.info.mpdInfo = {
        type: mpd.getAttribute('type') || 'static',
        mediaPresentationDuration: mpd.getAttribute('mediaPresentationDuration'),
        minimumUpdatePeriod: mpd.getAttribute('minimumUpdatePeriod'),
        timeShiftBufferDepth: mpd.getAttribute('timeShiftBufferDepth'),
        availabilityStartTime: mpd.getAttribute('availabilityStartTime'),
        profiles: mpd.getAttribute('profiles'),
      };

      console.log('📋 MPD Info:', this.info.mpdInfo);

      // Check for required elements
      const periods = this.xmlDoc.querySelectorAll('Period');
      if (periods.length === 0) {
        this.issues.push({
          type: 'structure',
          message: 'No Period elements found',
        });
        return;
      }

      console.log(`📅 Found ${periods.length} period(s)`);

      // Analyze adaptation sets
      const adaptationSets = this.xmlDoc.querySelectorAll('AdaptationSet');
      if (adaptationSets.length === 0) {
        this.issues.push({
          type: 'structure',
          message: 'No AdaptationSet elements found',
        });
        return;
      }

      console.log(`🎵 Found ${adaptationSets.length} adaptation set(s)`);

      // Analyze representations
      let audioRepresentations = 0;
      let videoRepresentations = 0;

      adaptationSets.forEach((adaptationSet, index) => {
        const mimeType =
          adaptationSet.getAttribute('mimeType') || adaptationSet.getAttribute('contentType');
        const representations = adaptationSet.querySelectorAll('Representation');

        console.log(`🔍 AdaptationSet ${index + 1}:`, {
          mimeType,
          representations: representations.length,
          segmentTemplate: !!adaptationSet.querySelector('SegmentTemplate'),
          segmentList: !!adaptationSet.querySelector('SegmentList'),
          baseURL: !!adaptationSet.querySelector('BaseURL'),
        });

        if (mimeType && mimeType.startsWith('audio/')) {
          audioRepresentations += representations.length;
        } else if (mimeType && mimeType.startsWith('video/')) {
          videoRepresentations += representations.length;
        }

        // Check for segment info
        const hasSegmentTemplate = adaptationSet.querySelector('SegmentTemplate');
        const hasSegmentList = adaptationSet.querySelector('SegmentList');

        if (!hasSegmentTemplate && !hasSegmentList) {
          this.warnings.push({
            type: 'segments',
            message: `AdaptationSet ${index + 1} has no SegmentTemplate or SegmentList`,
          });
        }
      });

      this.info.streamInfo = {
        audioRepresentations,
        videoRepresentations,
        totalAdaptationSets: adaptationSets.length,
      };

      if (audioRepresentations === 0 && videoRepresentations === 0) {
        this.issues.push({
          type: 'content',
          message: 'No audio or video representations found',
        });
      }

      console.log('✅ DASH structure validation complete');
    } catch (error) {
      this.issues.push({
        type: 'validation',
        message: `DASH structure validation failed: ${error.message}`,
      });
    }
  }

  /**
   * Check if segments are accessible
   */
  async checkSegmentAvailability() {
    console.log('🔍 Checking segment availability...');

    try {
      // Find first segment template or list
      const segmentTemplate = this.xmlDoc.querySelector('SegmentTemplate');
      const segmentList = this.xmlDoc.querySelector('SegmentList');

      if (segmentTemplate) {
        await this.checkSegmentTemplate(segmentTemplate);
      } else if (segmentList) {
        await this.checkSegmentList(segmentList);
      } else {
        this.warnings.push({
          type: 'segments',
          message: 'No segment templates or lists found to validate',
        });
      }
    } catch (error) {
      this.warnings.push({
        type: 'segments',
        message: `Segment availability check failed: ${error.message}`,
      });
    }
  }

  /**
   * Check segment template URL construction
   */
  async checkSegmentTemplate(segmentTemplate) {
    const media = segmentTemplate.getAttribute('media');
    const initialization = segmentTemplate.getAttribute('initialization');

    console.log('📦 Segment template found:', { media, initialization });

    if (!media) {
      this.issues.push({
        type: 'segments',
        message: 'SegmentTemplate missing media attribute',
      });
      return;
    }

    // Try to construct a segment URL
    try {
      const baseUrl = this.getBaseUrl();
      let segmentUrl = media
        .replace('$RepresentationID$', '1')
        .replace('$Number$', '1')
        .replace('$Time$', '0');

      if (!segmentUrl.startsWith('http')) {
        segmentUrl = new URL(segmentUrl, baseUrl).href;
      }

      console.log('🔗 Testing segment URL:', segmentUrl);

      // Test segment accessibility
      const response = await fetch(segmentUrl, { method: 'HEAD' });
      if (response.ok) {
        console.log('✅ Sample segment accessible');
        this.info.segmentAccessible = true;
      } else {
        this.warnings.push({
          type: 'segments',
          message: `Sample segment returned ${response.status}`,
          url: segmentUrl,
        });
      }
    } catch (error) {
      this.warnings.push({
        type: 'segments',
        message: `Could not test segment accessibility: ${error.message}`,
      });
    }
  }

  /**
   * Check segment list
   */
  async checkSegmentList(segmentList) {
    const segments = segmentList.querySelectorAll('SegmentURL');
    console.log(`📦 Found ${segments.length} segments in list`);

    if (segments.length === 0) {
      this.issues.push({
        type: 'segments',
        message: 'SegmentList contains no SegmentURL elements',
      });
      return;
    }

    // Test first segment
    const firstSegment = segments[0];
    const media = firstSegment.getAttribute('media');

    if (media) {
      try {
        const baseUrl = this.getBaseUrl();
        const segmentUrl = new URL(media, baseUrl).href;

        console.log('🔗 Testing first segment:', segmentUrl);

        const response = await fetch(segmentUrl, { method: 'HEAD' });
        if (response.ok) {
          console.log('✅ First segment accessible');
          this.info.segmentAccessible = true;
        } else {
          this.warnings.push({
            type: 'segments',
            message: `First segment returned ${response.status}`,
            url: segmentUrl,
          });
        }
      } catch (error) {
        this.warnings.push({
          type: 'segments',
          message: `Could not test first segment: ${error.message}`,
        });
      }
    }
  }

  /**
   * Validate timing information for live streams
   */
  validateTimingInfo() {
    if (this.info.mpdInfo?.type === 'dynamic') {
      console.log('⏰ Validating live stream timing...');

      const availabilityStartTime = this.info.mpdInfo.availabilityStartTime;
      if (!availabilityStartTime) {
        this.issues.push({
          type: 'timing',
          message: 'Live stream missing availabilityStartTime',
        });
      }

      const timeShiftBufferDepth = this.info.mpdInfo.timeShiftBufferDepth;
      if (!timeShiftBufferDepth) {
        this.warnings.push({
          type: 'timing',
          message: 'Live stream missing timeShiftBufferDepth',
        });
      }

      console.log('✅ Timing validation complete');
    }
  }

  /**
   * Get base URL for resolving relative URLs
   */
  getBaseUrl() {
    const baseUrlElement = this.xmlDoc.querySelector('BaseURL');
    if (baseUrlElement) {
      return baseUrlElement.textContent.trim();
    }

    // Use manifest URL as base
    return this.url.substring(0, this.url.lastIndexOf('/') + 1);
  }

  /**
   * Generate validation report
   */
  getReport() {
    const hasErrors = this.issues.length > 0;
    const hasWarnings = this.warnings.length > 0;

    return {
      valid: !hasErrors,
      url: this.url,
      issues: this.issues,
      warnings: this.warnings,
      info: this.info,
      summary: {
        errors: this.issues.length,
        warnings: this.warnings.length,
        streamType: this.info.mpdInfo?.type || 'unknown',
        audioTracks: this.info.streamInfo?.audioRepresentations || 0,
        videoTracks: this.info.streamInfo?.videoRepresentations || 0,
        segmentsAccessible: this.info.segmentAccessible || false,
      },
    };
  }

  /**
   * Print a formatted report to console
   */
  printReport() {
    const report = this.getReport();

    console.log('\n🔍 DASH MANIFEST VALIDATION REPORT');
    console.log('=====================================');
    console.log(`URL: ${report.url}`);
    console.log(`Valid: ${report.valid ? '✅ YES' : '❌ NO'}`);
    console.log(`Stream Type: ${report.summary.streamType}`);
    console.log(`Audio Tracks: ${report.summary.audioTracks}`);
    console.log(`Video Tracks: ${report.summary.videoTracks}`);
    console.log(`Segments Accessible: ${report.summary.segmentsAccessible ? '✅' : '❌'}`);

    if (report.issues.length > 0) {
      console.log('\n❌ ISSUES:');
      report.issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. [${issue.type}] ${issue.message}`);
      });
    }

    if (report.warnings.length > 0) {
      console.log('\n⚠️ WARNINGS:');
      report.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. [${warning.type}] ${warning.message}`);
      });
    }

    console.log('\n=====================================\n');

    return report;
  }
}

/**
 * Quick validation function
 */
export async function validateManifest(url) {
  const checker = new ManifestChecker(url);
  await checker.validate();
  return checker.printReport();
}

/**
 * Console helper for debugging manifests
 */
export function addManifestDebugger() {
  if (typeof window !== 'undefined') {
    window.validateManifest = validateManifest;
    window.ManifestChecker = ManifestChecker;

    console.log('🔧 Manifest debugger added to window:');
    console.log('  - validateManifest(url) - Quick validation');
    console.log('  - new ManifestChecker(url) - Detailed checker');
  }
}
