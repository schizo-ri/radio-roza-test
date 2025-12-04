# Audio Interruption Detection Documentation

## Overview

This document describes the audio interruption detection and recovery features implemented in the AudioPlayer component. These features help maintain a consistent user experience when audio playback is interrupted due to system-level changes like switching audio output devices.

## Problem Statement

When users switch audio output devices (e.g., from speakers to headphones, or changing Bluetooth devices), web audio playback often gets interrupted but the player UI may still show a "playing" state. This creates confusion as users see a stop button but hear no audio.

## Implementation Details

### Detection Methods

The AudioPlayer component uses multiple detection strategies to catch different types of interruptions:

#### 1. Navigator MediaDevices API
```javascript
navigator.mediaDevices.addEventListener('devicechange', () => {
    console.log('Audio devices changed');
    if (isPlaying && player && !player.paused) {
        setTimeout(() => checkForInterruption(), 1000);
    }
});
```

**Detects:** Audio device changes (plugging/unplugging headphones, switching output devices)

#### 2. Web Audio Context State Monitoring
```javascript
audioContext.addEventListener('statechange', () => {
    if (audioContext.state === 'suspended' && isPlaying) {
        console.warn('AudioContext suspended - audio likely interrupted');
        isPlaying = false;
        handleError('Audio context suspended');
    }
});
```

**Detects:** Audio context suspension (common when audio focus is lost)

#### 3. Playback Progress Monitoring
```javascript
function checkForInterruption() {
    if (player.currentTime === lastKnownTime && isPlaying && !player.paused) {
        console.warn('Audio interruption detected - playback stuck');
        isPlaying = false;
        handleError('Audio output interrupted - click play to resume');
    }
    lastKnownTime = player.currentTime;
}
```

**Detects:** Stuck playback (when currentTime doesn't advance despite claiming to play)

#### 4. HTML5 Audio Element Events
```javascript
player.addEventListener('pause', () => {
    if (isPlaying && !player.ended) {
        console.warn('Audio paused unexpectedly - likely interrupted');
        isPlaying = false;
    }
});
```

**Detects:** Unexpected pause events not triggered by user interaction

#### 5. Dash.js Stream Events
```javascript
dash.on(dashjs.MediaPlayer.events.PLAYBACK_STALLED, () => {
    if (isPlaying && !player.paused) {
        handleError('Audio playback stalled');
    }
});

dash.on(dashjs.MediaPlayer.events.CONNECTION_CLOSED, () => {
    handleError('Audio connection lost');
});
```

**Detects:** Stream-specific interruptions and connection issues

### Recovery Mechanisms

#### 1. Automatic Recovery
When an interruption is detected, the system attempts automatic recovery:

```javascript
async function attemptRecovery() {
    // Clear error state
    hasError = false;
    errorMessage = '';

    // Resume AudioContext if suspended
    if (audioContext && audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    // Reinitialize dash player
    if (dash && player) {
        dash.destroy();
        const dashjs = await import('dashjs');
        dash = dashjs.MediaPlayer().create();
        dash.updateSettings(dashSettings(dashjs));
        dash.initialize(player, url, false);

        // Wait then try to play
        setTimeout(async () => {
            await player.play();
        }, 1000);
    }
}
```

#### 2. Manual Recovery Button
A recovery button appears in the error UI for manual intervention:

```svelte
{#if errorMessage.includes('interrupted') || errorMessage.includes('stalled')}
    <button class="recovery-btn" onclick={attemptRecovery}>Try Recovery</button>
{/if}
```

### User Experience Flow

1. **Normal Playback**: Audio plays normally, UI shows correct state
2. **Interruption Detected**: One or more detection methods trigger
3. **State Update**: `isPlaying` set to `false`, error message displayed
4. **Automatic Recovery**: System attempts to recover after 2-second delay
5. **Manual Recovery**: User can click recovery button if auto-recovery fails
6. **Fallback**: System can fall back to MP3 stream if DASH fails completely

## Testing

### Manual Testing Scenarios

1. **Device Switch Test**
   - Start audio playback
   - Change system audio output device in OS settings
   - Verify interruption is detected and recovery attempted

2. **Headphone Test**
   - Start playback with headphones
   - Unplug headphones during playback
   - Check if player updates state correctly

3. **App Focus Test**
   - Start playback
   - Switch to another application that uses audio
   - Return to browser and verify state

4. **Mobile Tab Switch**
   - Start playback on mobile browser
   - Switch to another app or browser tab
   - Return and check player state consistency

### Automated Testing
Visit `/demo/interruption-test` to access the test page with:
- Simulated AudioContext suspension
- Device change event simulation
- Real-time test result logging
- Manual testing instructions

## Configuration

### Timing Parameters
```javascript
// Interruption check interval
interruptionCheckTimer = setInterval(checkForInterruption, 1000);

// Recovery attempt delay
setTimeout(() => {
    if (hasError && !isPlaying) {
        attemptRecovery();
    }
}, 2000);

// Buffering stuck timeout
bufferingStuckTimer = setTimeout(() => {
    attemptRecovery();
}, 4000);
```

### Error Messages
The system uses specific error messages to trigger different recovery options:
- `"interrupted"` - Shows recovery button
- `"stalled"` - Shows recovery button
- `"connection"` - Shows recovery button
- Other errors - Generic error handling

## Browser Compatibility

### Supported Features
- **Navigator MediaDevices API**: Chrome 47+, Firefox 36+, Safari 11+
- **Web Audio Context**: Chrome 35+, Firefox 25+, Safari 14.1+
- **HTML5 Audio Events**: All modern browsers
- **Dash.js Events**: Depends on dash.js library support

### Fallback Behavior
- If MediaDevices API unavailable: Other detection methods still work
- If AudioContext unavailable: Falls back to HTML5 audio events only
- If dash.js unavailable: Falls back to MP3 stream playback

## Common Issues and Solutions

### Issue: False Positive Detection
**Symptom**: Recovery triggered during normal buffering
**Solution**: Adjust timing parameters and add additional checks

### Issue: Recovery Loop
**Symptom**: Continuous recovery attempts without success
**Solution**: Implement maximum retry limits and exponential backoff

### Issue: Mobile Safari Audio Context
**Symptom**: AudioContext doesn't resume after interruption
**Solution**: Ensure user gesture triggers context resume

### Issue: CORS Errors During Recovery
**Symptom**: Stream fails to load after device change
**Solution**: Verify stream URLs and CORS headers

## Performance Considerations

- **Timer Frequency**: 1-second intervals balance responsiveness with performance
- **Memory Usage**: Event listeners are properly cleaned up on component destroy
- **CPU Impact**: Minimal due to simple currentTime comparisons
- **Network Impact**: Recovery attempts may cause brief stream reloads

## Future Enhancements

1. **Predictive Detection**: Monitor system audio device changes proactively
2. **Quality Adaptation**: Adjust stream quality based on device capabilities
3. **Persistence**: Remember user's last successful audio configuration
4. **Analytics**: Track interruption frequency and recovery success rates
5. **Smart Recovery**: Learn from failed recovery attempts to improve success rate